import { FiSlash } from "react-icons/fi";
export default function SlashIcon() {
    return (
        <span className="me-4 position-relative">
            <FiSlash
                className="fs-5 position-absolute"
                style={{ top: "-2px", left: "0" }}
            />
        </span>
    );
}

