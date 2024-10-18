const Display: React.FC<DisplayProps> = ({ currentAyah, currentReference }) => {
  return (
    <>
      <div id="text">
        <blockquote>
          <p className="font-josefin italic text-2xl text-gray-800 my-2">
            {currentAyah}
          </p>
        </blockquote>
      </div>
      <div id="reference">
        <cite className="font-k2d text-xl text-gray-600 mt-4">
          {currentReference}
        </cite>
      </div>
    </>
  )
}

export default Display
