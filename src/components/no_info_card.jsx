import NoInfoImg from "../assets/images/no_info.png"

export default function NoInfoCard({ header, message }) {
  return(
    <>
      <div className="flex flex-col justify-center items-center p-12">
        <img src={NoInfoImg} className="w-24 h-24"/>
        <h1 className="modal-header-text !text-[24px] text-center !text-[#0A4F42] font-bold mt-4">{header}</h1>
        <h1 className={`info-card-desc text-center`}>{message}</h1>
      </div>
    </>
  )
}