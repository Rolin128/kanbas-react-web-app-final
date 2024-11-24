import React from "react";

export default function AssiDelete({assignmentId, deleteAssignment}: {
    assignmentId: string,
    deleteAssignment: (assignmentId: string) => void
}) {
    return (
        <div id={`wd-delete-assignment-${assignmentId}-dialog`} className="modal fade" data-bs-backdrop="static"
             data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Delete Assignment</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Confirm delete assignment {assignmentId}?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button onClick={() => deleteAssignment(assignmentId)} type="button" data-bs-dismiss="modal"
                                className="btn btn-danger">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}