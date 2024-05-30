import { connectToDB } from "@/utils/helpers/connectDB";
import Group from "@/models/Group";
import Mentor from "@/models/Mentor";
import Project from "@/models/Project";
import Proposal from "@/models/Proposal";
import Student from "@/models/Student";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { Approval } from "@/utils/constants/enums";

export async function POST(request, { params }) {
  connectToDB();

  try {
    const profileID = request.headers.get("profileID");
    const id = params.id;

    const student = await Student.findById(profileID);

    if (student.group === null)
      return NextResponse.json({ message: "Student is not in a group" },{ status: HttpStatusCode.BadRequest });

    const group = await Group.findById(student.group).select(
      "lead project selectedProposal supervisor mentors confirmed"
    );

    if (!group.confirmed)
      return NextResponse.json({ message: "Group has not been confirmed" }, { status: HttpStatusCode.BadRequest });

    if (group.project)
      return NextResponse.json({ message: "Group has already finalized a project" }, { status: HttpStatusCode.BadRequest });

    if (profileID != group.lead)
      return NextResponse.json({ message: "You are not the lead of the group" },{ status: HttpStatusCode.BadRequest });

    const chosenProposal = group.selectedProposal.filter(
      (proposals) => proposals.proposal == id
    );

    if (chosenProposal.length === 0)
      return NextResponse.json({ message: "Proposal not found" }, { status: HttpStatusCode.NotFound });

    if (chosenProposal[0].status !== Approval.Approved)
      return NextResponse.json({ message: "Proposal has not been approved" }, { status: HttpStatusCode.BadRequest });

    for (const selectedProposal of group.selectedProposal) {
      if (selectedProposal.proposal != id) {
        const proposal = await Proposal.findById(selectedProposal.proposal).select('proposer');
        if (proposal.proposer === "Mentor") {
          proposal.edit = true;
          proposal.selectedBy = null;
        }
        await proposal.save();
      }
    }
    group.selectedProposal = group.selectedProposal.filter(
      (selected) => selected.proposal == id
    );

    const project = new Project({
      proposal: id,
      group: group._id,
      milestones: [],
      year: (new Date().getFullYear()),
    });

    const proposal = await Proposal.findById(id).select("proposer proposedBy mentorship");

    if (proposal.proposer === "Mentor" && proposal.mentorship) {
        if (!proposal.proposedBy.equals(group.supervisor) && !group.mentors.some(mentor => mentor.equals(proposal.proposedBy)))
            group.mentors.push(proposal.proposedBy);
    }

    if(proposal.proposer === "Group" && proposal.proposedBy != group._id) {
        proposal.edit = false;
    }

    group.project = project._id;
    proposal.available = false;

    await proposal.save();
    await group.save();
    await project.save();

    return NextResponse.json({ message: "Project Finalized", project: project }, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: HttpStatusCode.InternalServerError });
  }
}
