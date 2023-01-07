import classNames from '../../helpers/classNames';

const Actor = ({ className, actor }) => {
  return (
    <div
      className={classNames(
        'relative overflow-hidden rounded-md shadow-md cursor-pointer aspect-square group',
        className
      )}
    >
      <img
        className='object-cover w-full h-full duration-500 bg-white group-hover:grayscale group-hover:scale-150 group-hover:translate-x-1/4'
        src={actor.image}
      />
      <div className='absolute text-base md:text-lg top-2 left-2'>
        <div className='text-white duration-500 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100'>
          {actor.name}
        </div>
      </div>
    </div>
  );
};
export default Actor;
