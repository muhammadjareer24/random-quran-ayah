import React from "react"

const Controls: React.FC<ControlsProps> = ({
  onNewAyah,
  onCopyAyah,
  onWhatsAppShare,
}) => {
  return (
    <>
      <div
        id="buttons"
        className="flex justify-between  items-center gap-2 mt-5"
      >
        <button
          className="flex items-center justify-center bg-[#007BFF] text-white rounded-lg px-3 py-2 hover:bg-[#3399ff] transition duration-300 shadow-md"
          id="newBtn"
          onClick={onNewAyah}
        >
          <i className="fas fa-sync-alt mr-2"></i> New
        </button>
        {/* Grouping Copy and WhatsApp buttons on the right side */}
        <div className="flex items-center justify-end space-x-2">
          <button
            className="flex items-center justify-center bg-[#17A2B8] text-white rounded-lg px-3 py-3 hover:bg-[#33bbc1] transition duration-300 shadow-md"
            id="copyBtn"
            onClick={onCopyAyah}
          >
            <i className="fas fa-copy "></i>
          </button>
          <button
            className="flex items-center justify-center bg-[#25D366] text-white rounded-lg px-3 py-2 hover:bg-green-400 transition duration-300 shadow-md"
            id="whatsappBtn"
            onClick={onWhatsAppShare}
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
            <span className="hidden xs:block ml-2">WhatsApp</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Controls
