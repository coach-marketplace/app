import React from "react";

export default function Tag({
    closeable,
    onDelete,
    text
}) {
    return <div class="tag">
        <p>{text}</p>
        {closeable && <button onClick={onDelete}>X</button>}
    </div>
}