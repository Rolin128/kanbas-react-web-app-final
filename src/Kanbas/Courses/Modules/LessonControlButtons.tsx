import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { HiOutlinePlus } from "react-icons/hi";

export default function LessonControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <HiOutlinePlus className="fs-4"/>
            <IoEllipsisVertical className="fs-5" />
        </div>
    );
}