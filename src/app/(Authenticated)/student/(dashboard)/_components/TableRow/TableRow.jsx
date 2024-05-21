"use client";

import { useRouter } from "next/navigation";

export default function TableRow({children, setOpenModal, setModalTitle, setModalContent}){
    const router = useRouter();
    return (
        <tr 
            className="border-b dark:border-gray-700 hover:bg-gray-100 cursor-pointer"  
            onClick={
                () => {
                    router.push("mentors/123")
                }
            }
        >
                     
            {children}
            
        </tr>
    );
}