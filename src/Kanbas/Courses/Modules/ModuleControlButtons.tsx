import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { HiOutlinePlus } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import ProtectedContent from "../../Account/ProtectedContent";
export default function ModuleControlButtons(
    { moduleId, deleteModule, editModule }: { moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void }
) {
    return (
        <div className="float-end">
            <ProtectedContent
                facultyContent={
                    <>
                        <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
                        <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)} />
                    </>
                } studentContent={undefined} />
            <GreenCheckmark />
            <HiOutlinePlus className="fs-4" />
            <IoEllipsisVertical className="fs-5" />
        </div>
    );
}