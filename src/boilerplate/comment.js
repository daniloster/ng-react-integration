import React, {
    PropTypes
} from 'react';
/*
const rawMarkup = { __html: marked(children.toString(), {sanitize: true}) };
<span dangerouslySetInnerHTML={rawMarkup} />
*/
const Comment = ({ author, text }) => (
    <div className="comment">
        <h2 className="commentAuthor">
            {author}
        </h2>
        <p>{text}</p>
    </div>
);

Comment.propTypes = {
    author: PropTypes.string,
    text: PropTypes.string
};

export default Comment;
