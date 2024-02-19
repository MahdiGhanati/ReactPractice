
import React, { useContext, useEffect, useState } from 'react'
import DraggableModal from './DraggableModal'
import {UserContext} from '../context/UserContext';

const GeneralReport = () => {
    const [showGeneralReportModal, setshowGeneralReportModal] = useState(false)
    // const [user, setUser] = useState({
    //     fullName: 'mmm Ali Jafari',
    //     avatar: "https://avatars2.githubusercontent.com/u/6865268?s=460&v=4",
    //     github:"https://github.com/MTaheriii",
    //     linkedin:"https://www.linkedin.com/in/mostafa-ali-jafari/",
    //   })

    const {user,setUser} = useContext(UserContext)
    

    return (
        <>
        <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
             onClick={() => setshowGeneralReportModal(true)}
        >
            Open regular modal
        </button>
            <DraggableModal
                closeBtnCallback={() => setshowGeneralReportModal(false)}
                name="generalReport"
                isShow={showGeneralReportModal}
                title={"گزارش عمومی"}
                left={100}
                height={600}
                width={800}
                headColor="blue lighten-3"
                backColor="blue lighten-5"
            >
                {
                        <div className="container">
                            <main>
        
                                <div className="row g-5">
                                <div className="col-md-12 col-lg-12">
                                    <h4 className="mb-3 not_global_font text-center">گزارش عمومی</h4>
                                    <div className="row col-12">
                                            <div className="table-responsive">
                                                Mahdi Ghanati : {user.linkedin}
                                            </div>
                                            <div className="col">
                                            </div>
                                    </div> 
                            
                                </div>
                                
                                </div>
                            </main>

                        </div>
                }
            </DraggableModal>
        </>
    )

}


export default GeneralReport