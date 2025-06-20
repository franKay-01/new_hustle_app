import { useLocation, Link} from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const route = location.pathname;

  return (
    <>
      <aside className="w-64 bg-[#003C2F] text-white hidden lg:flex md:hidden flex-col">
        <div className="p-6 text-2xl font-bold">Hustle.io</div>
        <nav className="flex flex-col space-y-2 px-4 text-left">
          <Link to={'/'} className={`${route === '/' || route === '/creator/home' ? 'bg-[#FDBA40]' : ''} flex flex-row gap-2 text-black py-2 px-4 rounded text-left items-center`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.51602 2.36667L3.02435 5.86667C2.27435 6.45 1.66602 7.69167 1.66602 8.63334V14.8083C1.66602 16.7417 3.24102 18.325 5.17435 18.325H14.8244C16.7577 18.325 18.3327 16.7417 18.3327 14.8167V8.75C18.3327 7.74167 17.6577 6.45 16.8327 5.875L11.6827 2.26667C10.516 1.45 8.64102 1.49167 7.51602 2.36667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 14.9917V12.4917" stroke="#F3E4C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 className="sidebar-label">My Feed</h1>
          </Link>
          <Link to={'/myHustles'} className={`${route === '/myHustles' ? 'bg-[#FDBA40]' : ''} flex flex-row gap-2 text-black py-2 px-4 rounded text-left items-center`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.0827 9.41674V5.86676C17.0827 2.50842 16.2993 1.66675 13.1493 1.66675H6.84935C3.69935 1.66675 2.91602 2.50842 2.91602 5.86676V15.2501C2.91602 17.4667 4.13269 17.9917 5.60769 16.4084L5.61601 16.4001C6.29934 15.6751 7.34101 15.7334 7.93267 16.5251L8.77435 17.6501" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.66602 5.83325H13.3327" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.5 9.16675H12.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.1765 12.3086L12.2265 15.2586C12.1098 15.3752 12.0015 15.5919 11.9765 15.7502L11.8182 16.8752C11.7598 17.2836 12.0432 17.5669 12.4515 17.5086L13.5765 17.3502C13.7348 17.3252 13.9598 17.2169 14.0682 17.1002L17.0182 14.1502C17.5265 13.6419 17.7682 13.0502 17.0182 12.3002C16.2765 11.5586 15.6848 11.8002 15.1765 12.3086Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.75 12.7336C15 13.6336 15.7 14.3336 16.6 14.5836" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 className="sidebar-label">My hustles</h1>
          </Link>
          <Link to={'/myWallet'} className={`${route === '/myWallet' ? 'bg-[#FDBA40]' : ''} flex flex-row gap-2 text-black py-2 px-4 rounded text-left items-center`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.7935 5.87432C14.5935 5.84099 14.3852 5.83267 14.1685 5.83267H5.83516C5.60182 5.83267 5.37682 5.84933 5.16016 5.88266C5.27682 5.64933 5.44349 5.43269 5.64349 5.23269L8.35182 2.51602C9.49349 1.38268 11.3435 1.38268 12.4852 2.51602L13.9435 3.99098C14.4768 4.51598 14.7602 5.18266 14.7935 5.87432Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7.4987 15.8333C7.4987 16.4583 7.3237 17.05 7.01536 17.55C6.44036 18.5167 5.38203 19.1667 4.16536 19.1667C2.9487 19.1667 1.89036 18.5167 1.31536 17.55C1.00703 17.05 0.832031 16.4583 0.832031 15.8333C0.832031 13.9917 2.3237 12.5 4.16536 12.5C6.00703 12.5 7.4987 13.9917 7.4987 15.8333Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.40911 15.8164H2.92578" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.16406 14.5996V17.0913" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.3346 10.0007V14.1673C18.3346 16.6673 16.668 18.334 14.168 18.334H6.35964C6.61797 18.1173 6.84297 17.8506 7.01797 17.5506C7.3263 17.0506 7.5013 16.459 7.5013 15.834C7.5013 13.9923 6.00964 12.5007 4.16797 12.5007C3.16797 12.5007 2.2763 12.9423 1.66797 13.634V10.0007C1.66797 7.73398 3.03464 6.15065 5.15964 5.88398C5.3763 5.85065 5.6013 5.83398 5.83464 5.83398H14.168C14.3846 5.83398 14.593 5.84231 14.793 5.87564C16.943 6.12564 18.3346 7.71732 18.3346 10.0007Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.3346 10.416H15.8346C14.918 10.416 14.168 11.166 14.168 12.0827C14.168 12.9993 14.918 13.7493 15.8346 13.7493H18.3346" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 className="sidebar-label">My wallet</h1>
          </Link>
          <Link to={'/settings'} className={`${route === '/settings' ? 'bg-[#FDBA40]' : ''} flex flex-row gap-2 text-black py-2 px-4 rounded text-left items-center`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.9987 0.833332L17.9154 5.41667V14.5833L9.9987 19.1667L2.08203 14.5833V5.41667L9.9987 0.833332ZM9.9987 2.75917L3.7487 6.37759V13.6224L9.9987 17.2408L16.2487 13.6224V6.37759L9.9987 2.75917ZM9.9987 13.3333C8.15775 13.3333 6.66536 11.8409 6.66536 10C6.66536 8.15905 8.15775 6.66667 9.9987 6.66667C11.8396 6.66667 13.332 8.15905 13.332 10C13.332 11.8409 11.8396 13.3333 9.9987 13.3333ZM9.9987 11.6667C10.9192 11.6667 11.6654 10.9205 11.6654 10C11.6654 9.0795 10.9192 8.33333 9.9987 8.33333C9.0782 8.33333 8.33203 9.0795 8.33203 10C8.33203 10.9205 9.0782 11.6667 9.9987 11.6667Z" fill="white"/>
            </svg>
            <h1 className="sidebar-label">Settings</h1>
          </Link>
        </nav>
      </aside>
    </>
  )
}