import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./QizGreenCheckmark";
export default function QizControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-5" />
        </div>
    );
}