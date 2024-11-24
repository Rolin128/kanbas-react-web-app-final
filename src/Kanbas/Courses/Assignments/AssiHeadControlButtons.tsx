import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./AssiGreenCheckmark";
import { HiOutlinePlus } from "react-icons/hi";
export default function LessonControlButtons() {
    return (
        <div className="d-flex align-items-center">
            <div className="oval-label me-3">
                <span>40% of Total</span>
            </div>
            <HiOutlinePlus className="fs-4 me-3" />
            <IoEllipsisVertical className="fs-5" />
        </div>
    );
}