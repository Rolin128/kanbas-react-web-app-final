import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./AssiGreenCheckmark";
import { FaTrashAlt } from "react-icons/fa";
import AssiDelete from "./AssDelete";
import { useSelector } from "react-redux";
import ProtectedContent from "../../Account/ProtectedContent";

export default function AssiControlButtons({assignmentId, deleteAssignment}: {
    assignmentId: string,
    deleteAssignment: (assignmentId: string) => void;}) {
        return (
            <div className="float-end">
                <ProtectedContent
                    facultyContent={<FaTrashAlt className="trash-icon" data-bs-toggle="modal" data-bs-target={`#wd-delete-assignment-${assignmentId}-dialog`} />} studentContent={undefined} />
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-5" />
                <AssiDelete assignmentId={assignmentId} deleteAssignment={deleteAssignment} />   
            </div>
        );
    
}
