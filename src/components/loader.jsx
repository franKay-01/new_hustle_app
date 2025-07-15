import LoaderData from "./loader/loader.svg"

export default function Loader({alt}) {
  const showHideClassName = alt ? "grid" : "grid place-items-center";

  return (
    <div className={showHideClassName}>
      <img className={`${ alt ? "w-12 h-12" : "w-28 h-28"}`} src={LoaderData} />
    </div>
    
  )
}