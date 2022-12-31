const CommentIcon = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='48'
      width='48'
      viewBox='0 0 48 48'
      fill='currentColor'
      className={className}
    >
      <path d='M13.9 27.5h21q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425h-21q-.65 0-1.075.425Q12.4 25.35 12.4 26q0 .65.425 1.075.425.425 1.075.425Zm0-6.5h21q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075Q35.55 18 34.9 18h-21q-.65 0-1.075.425-.425.425-.425 1.075 0 .65.425 1.075Q13.25 21 13.9 21Zm0-6.5h21q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425h-21q-.65 0-1.075.425Q12.4 12.35 12.4 13q0 .65.425 1.075.425.425 1.075.425Zm27.55 26.95L36 36H7q-1.15 0-2.075-.925Q4 34.15 4 33V7q0-1.15.925-2.075Q5.85 4 7 4h34q1.2 0 2.1.925Q44 5.85 44 7v33.4q0 1-.925 1.375t-1.625-.325Z' />
    </svg>
  );
};
export default CommentIcon;
