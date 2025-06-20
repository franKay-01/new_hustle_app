import { useState } from "react";
import Sidebar from "../../components/sidebar"
import Navbar from "../../components/navbar"
import { Disclosure, Switch } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import ContactDetails from "../../components/mini_page/contact_details"
import ServicesMiniPage from "../../components/mini_page/services"
import CreateServiceMiniPage from "../../components/mini_page/create_service"
import ChangePassword from "../../components/mini_page/change_password"
import ChangeEmail from "../../components/mini_page/change_email"
import DeleteAccount from "../../components/mini_page/delete_account"
import DeleteAccountModal from "../../components/modals/delete_modal";
import WorkingHoursMiniPage from "../../components/mini_page/working_hours";

export default function MyHustlesPage(){
  let [isOpen, setIsOpen] = useState(true);
  const [enabled, setEnabled] = useState(false)
  const [categorySelected, setCategorySelected] = useState("")
  const [selectedMenu, setSelectedMenu] = useState('contact_details');
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navigation = [
    { name: 'My Hustles', href: '/myHustles', current: true },
    { name: 'Settings', href: '/settings', current: false },
  ]

  const handleOpenCreateService = () => {
    setSelectedMenu('create_service')
  }

  const handleCloseCreateService = () => {
    setSelectedMenu('my_services')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F6F6]">
      <Sidebar/>
      <main className="flex-1 bg-[#F5F5F5] overflow-y-auto">
        <Navbar />
        <div className="pl-5 pr-5 pt-2">
          <h1 className="text-xl font-regular">Settings</h1>
          <div className="flex flex-row gap-4 mt-4">
            <div className="booking-card flex flex-col w-[30%]">
              <div className="h-screen w-full px-2">
                <div className="flex flex-col gap-6 mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
                  <Disclosure as="div" defaultOpen={true}>
                    <Disclosure.Button className="group flex w-full items-center justify-between">
                      <span className="flex flex-row items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.9987 10C12.2999 10 14.1654 8.13452 14.1654 5.83334C14.1654 3.53215 12.2999 1.66667 9.9987 1.66667C7.69751 1.66667 5.83203 3.53215 5.83203 5.83334C5.83203 8.13452 7.69751 10 9.9987 10Z" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16.0066 13.1167L13.0566 16.0667C12.9399 16.1834 12.8316 16.4 12.8066 16.5584L12.6482 17.6833C12.5899 18.0917 12.8732 18.375 13.2816 18.3167L14.4066 18.1583C14.5649 18.1333 14.7899 18.025 14.8982 17.9084L17.8482 14.9584C18.3566 14.45 18.5982 13.8583 17.8482 13.1083C17.1066 12.3667 16.5149 12.6083 16.0066 13.1167Z" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M15.582 13.5417C15.832 14.4417 16.532 15.1416 17.432 15.3916" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M2.83984 18.3333C2.83984 15.1083 6.0482 12.5 9.9982 12.5C10.8649 12.5 11.6982 12.625 12.4732 12.8583" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className="setting-heading">Business details</h1>
                      </span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.293 8.33314L10 12.6261L5.70703 8.33314L6.1748 7.86439L9.64648 11.3292L10 11.6818L10.3535 11.3292L13.8242 7.86439L14.293 8.33314Z" fill="#323232" stroke="#8F8F8F"/>
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 pl-4">
                      <div className="flex flex-col">
                        <h1 onClick={() => setSelectedMenu('contact_details')} className="cursor-pointer setting-heading-sub">Contact details</h1>
                        <h1 onClick={() => setSelectedMenu('my_services')} className="cursor-pointer setting-heading-sub">My services</h1>
                      </div>
                    </Disclosure.Panel>
                  </Disclosure>
                  <div className="flex flex-row justify-between items-center">
                    <span className="flex flex-row items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.66797 18.3333H18.3346" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 5C5.85833 5 2.5 8.35833 2.5 12.5V18.3333H17.5V12.5C17.5 8.35833 14.1417 5 10 5Z" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 1.66667V2.5" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.33203 3.33333L4.16536 4.16667" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.6654 3.33333L15.832 4.16667" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <h1 className="setting-heading">Available to work</h1>
                    </span>
                    <Switch
                      checked={enabled}
                      // onChange={updateSwitchStatus}
                      className={`${
                        enabled ? 'toggle-active-color' : 'bg-[#1F1F1F]'
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className="sr-only">Enable availability</span>
                      <span
                        className={`${
                          enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                  </div>
                  <div onClick={() => setSelectedMenu('working_hours')} className="flex flex-row items-center gap-2 cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99316 2.16667C14.3255 2.16677 17.8348 5.67636 17.835 9.99968C17.835 14.3231 14.3256 17.8336 9.99316 17.8337C5.66996 17.8337 2.16797 14.3242 2.16797 9.99968C2.16814 5.67532 5.67007 2.16667 9.99316 2.16667ZM10.001 2.83366C6.04176 2.83384 2.83514 6.04046 2.83496 9.99968C2.83496 13.959 6.04165 17.1665 10.001 17.1667C13.9605 17.1667 17.168 13.9592 17.168 9.99968C17.1678 6.04035 13.9603 2.83366 10.001 2.83366Z" fill="#323232" stroke="#8F8F8F"/>
                      <path d="M9.91797 6.33333V10.4935L10.1631 10.638L13.4775 12.6048L13.374 12.7738L9.66797 10.5501V6.33333H9.91797Z" fill="#323232" stroke="#8F8F8F"/>
                    </svg>
                    <h1 className="setting-heading">Working hours</h1>
                  </div>
                  <Disclosure as="div">
                    <Disclosure.Button className="group flex w-full items-center justify-between">
                      <span className="flex flex-row items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.5013 18.3334H12.5013C16.668 18.3334 18.3346 16.6667 18.3346 12.5001V7.50008C18.3346 3.33341 16.668 1.66675 12.5013 1.66675H7.5013C3.33464 1.66675 1.66797 3.33341 1.66797 7.50008V12.5001C1.66797 16.6667 3.33464 18.3334 7.5013 18.3334Z" stroke="#8F8F8F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12.9766 15.4167V12.1667" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12.9766 6.20825V4.58325" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12.9753 10.5416C14.1719 10.5416 15.1419 9.57154 15.1419 8.37492C15.1419 7.1783 14.1719 6.20825 12.9753 6.20825C11.7786 6.20825 10.8086 7.1783 10.8086 8.37492C10.8086 9.57154 11.7786 10.5416 12.9753 10.5416Z" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.02344 15.4167V13.7917" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.02344 7.83325V4.58325" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.02604 13.7916C8.22266 13.7916 9.19271 12.8215 9.19271 11.6249C9.19271 10.4283 8.22266 9.45825 7.02604 9.45825C5.82943 9.45825 4.85938 10.4283 4.85938 11.6249C4.85938 12.8215 5.82943 13.7916 7.02604 13.7916Z" stroke="#8F8F8F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 className="setting-heading">Account mangement</h1>
                      </span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.293 8.33314L10 12.6261L5.70703 8.33314L6.1748 7.86439L9.64648 11.3292L10 11.6818L10.3535 11.3292L13.8242 7.86439L14.293 8.33314Z" fill="#323232" stroke="#8F8F8F"/>
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 pl-4">
                      <div className="flex flex-col">
                        <h1 onClick={() => setSelectedMenu('change_password')} className="cursor-pointer setting-heading-sub">Change password</h1>
                        <h1 onClick={() => setSelectedMenu('change_email')} className="cursor-pointer setting-heading-sub">Change email</h1>
                        <h1 onClick={() => setSelectedMenu('account_verification')} className="cursor-pointer setting-heading-sub">Account verification</h1>
                        <h1 onClick={() => setSelectedMenu('delete_account')} className="cursor-pointer setting-heading-sub">Delete account</h1>
                      </div>
                    </Disclosure.Panel>
                  </Disclosure>
                  <div className="flex flex-row items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99609 14.5224C9.65109 14.5224 9.37109 14.2424 9.37109 13.8974V11.7832C9.37109 11.4382 9.65109 11.1582 9.99609 11.1582C10.3411 11.1582 10.6211 11.4382 10.6211 11.7832V13.8974C10.6211 14.2424 10.3411 14.5224 9.99609 14.5224Z" fill="#8F8F8F"/>
                      <mask id="mask0_7391_126137" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="1" y="3" width="18" height="10">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66797 3.81665H18.3261V12.4092H1.66797V3.81665Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask0_7391_126137)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.91797 9.49415C4.89797 10.57 7.39464 11.1592 9.99297 11.1592C12.5963 11.1592 15.0955 10.57 17.0763 9.49415V6.99248C17.0763 5.92998 16.2171 5.06665 15.1596 5.06665H4.84297C3.7813 5.06665 2.91797 5.92665 2.91797 6.98415V9.49415ZM9.99297 12.4092C7.0388 12.4092 4.1913 11.6941 1.97714 10.3975C1.78547 10.2858 1.66797 10.0808 1.66797 9.85832V6.98415C1.66797 5.23748 3.09214 3.81665 4.84297 3.81665H15.1596C16.9063 3.81665 18.3263 5.24082 18.3263 6.99248V9.85832C18.3263 10.0808 18.208 10.2858 18.0171 10.3975C15.803 11.6941 12.953 12.4092 9.99297 12.4092Z" fill="#8F8F8F"/>
                      </g>
                      <mask id="mask1_7391_126137" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="6" y="1" width="8" height="5">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.45703 1.66699H13.5404V5.06358H6.45703V1.66699Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask1_7391_126137)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9154 5.06342C12.5704 5.06342 12.2904 4.78341 12.2904 4.43841V4.13341C12.2904 3.46258 11.7445 2.91675 11.0737 2.91675H8.9237C8.25286 2.91675 7.70703 3.46258 7.70703 4.13341V4.43841C7.70703 4.78341 7.42703 5.06342 7.08203 5.06342C6.73703 5.06342 6.45703 4.78341 6.45703 4.43841V4.13341C6.45703 2.77341 7.5637 1.66675 8.9237 1.66675H11.0737C12.4337 1.66675 13.5404 2.77341 13.5404 4.13341V4.43841C13.5404 4.78341 13.2604 5.06342 12.9154 5.06342Z" fill="#8F8F8F"/>
                      </g>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8301 18.1168H5.16345C3.43428 18.1168 1.97845 16.766 1.84761 15.041L1.68928 12.9502C1.66345 12.606 1.92178 12.3052 2.26595 12.2793C2.61178 12.2668 2.91011 12.511 2.93678 12.856L3.09428 14.946C3.17595 16.0227 4.08428 16.8668 5.16345 16.8668H14.8301C15.9093 16.8668 16.8184 16.0227 16.8993 14.946L17.0576 12.856C17.0843 12.511 17.3901 12.266 17.7284 12.2793C18.0726 12.3052 18.3301 12.606 18.3043 12.9502L18.1459 15.041C18.0151 16.766 16.5593 18.1168 14.8301 18.1168Z" fill="#8F8F8F"/>
                    </svg>
                    <h1 className="setting-heading">My subscription</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] booking-card">
              {selectedMenu === 'contact_details' && <ContactDetails />}
              {selectedMenu === 'my_services' && <ServicesMiniPage handleOpenCreateService={handleOpenCreateService} handleCloseCreateService={handleCloseCreateService} />}
              {selectedMenu === 'create_service' && <CreateServiceMiniPage handleCloseCreateService={handleCloseCreateService} />}
              {selectedMenu === 'change_password' && <ChangePassword />}
              {selectedMenu === 'change_email' && <ChangeEmail />}
              {selectedMenu === 'working_hours' && <WorkingHoursMiniPage />}
              {selectedMenu === 'delete_account' && <DeleteAccount showDeleteModal={() => setShowDeleteModal(true)}/>}
            </div>
          </div>
        </div>

        { showDeleteModal && (
          <DeleteAccountModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)}/>
        )}
      </main>
    </div>
  )
}