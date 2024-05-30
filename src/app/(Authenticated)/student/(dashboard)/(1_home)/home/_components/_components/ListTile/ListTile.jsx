import styles from "./ListTile.module.css";

export default function ListTile({ sNo, title, deadline, marked, submitted }) {
  const calculateDaysLeft = (deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    if (currentDate > deadlineDate) {
        if (marked)
            return "Marked";
        if(submitted){
            return "Submitted";
        }
        return "Not Submitted";
    };
    const diffTime = deadlineDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Due Today";
    if (diffDays === 1) return "Due Tomorrow";

    return `Due in ${diffDays} days`;
  };

  const getColor = (deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    if (currentDate > deadlineDate) {
        if (marked)
            return "text-green-500";
        if(submitted){
            return "text-green-500";
        }
        return "text-red-500";
    };
    const diffTime = deadlineDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return "text-red-500";
    }
    if (diffDays === 1) {
      return "text-yellow-500";
    }
    return "text-blue-500";
  };

  return (
    <div className={`${styles.listTileWrapper} flex flex-col w-full `}>
      <div
        className={`${styles.listTileContentWrapper} flex flex-row justify-between w-full`}
      >
        <div
          className="w-1/12"
        >
          <p className={`${styles.common} font-montserrat text-neutral-500`}>
            {sNo}
          </p>
        </div>

        <div
          className="w-6/12"
        >
          <p className={`${styles.common} font-montserrat text-neutral-500`}>
            {title}
          </p>
        </div>

        <div className="w-5/12">
          <p
            className={`${styles.common} font-montserrat ${getColor(deadline)}`}
          >
            {calculateDaysLeft(deadline)}
          </p>
        </div>

      </div>

      <hr className={`${styles.divider}`} />
    </div>
  );
}
