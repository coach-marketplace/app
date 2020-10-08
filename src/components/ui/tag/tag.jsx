import React from "react";

import "./tag.css"

export default function Tag({
    closeable,
    onDelete,
    text
}) {
    return <div class="tag">
        <div>{text}</div>
        {closeable && <button class="tag-button" onClick={onDelete}>x</button>}
    </div>
}