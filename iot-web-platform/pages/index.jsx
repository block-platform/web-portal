import { React, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router'
import { useUser } from '../lib/customHooks';
import Layout from '../components/Layout';
// import { TabHead, TabContainer, TabBody, Tab } from "../styles"
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export default function Home() {
  const { user, authenticated } = useUser();
  const [openTab, setOpenTab] = useState(1);

  const router = useRouter();

  if (!user || !authenticated) {
    console.log("Not getting user in index.js")
    return <Layout>
      <div className="p-16">
        <div className="text-2xl mb-4 font-bold text-blue-900">Home - Client Side Auth</div>
        <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-blue-900" />
      </div>
    </Layout>;
  }

  // const {
  //   query: { tab }
  // } = router;

  // const isNetworkManagementTab = tab === "networkManagement" || tab == null;
  // const isPolicyManagementTab = tab === "policyManagement";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className="p-16">
        <div className="text-2xl mb-4 font-bold text-blue-900">Home - Client Side Auth</div>
        {
          user &&
          // <TabContainer>
          //   <TabHead>
          //     <Tab selected={isNetworkManagementTab}>
          //       <Link href={{ pathname: "/", query: { tab: "networkManagement" } }}>
          //         <a>Network Management</a>
          //       </Link>
          //     </Tab>
          //     <Tab selected={isPolicyManagementTab}>
          //       <Link href={{ pathname: "/", query: { tab: "policyManagement" } }}>
          //         <a>Policy Management</a>
          //       </Link>
          //     </Tab>
          //   </TabHead>
          //   <TabBody>
          //     {isNetworkManagementTab && <div>Network Management</div>}
          //     {isPolicyManagementTab && <div>Policy Management</div>}
          //   </TabBody>
          // </TabContainer>
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 1
                        ? "text-white bg-purple-600"
                        : "text-purple-600 bg-white")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Profile
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 2
                        ? "text-white bg-purple-600"
                        : "text-purple-600 bg-white")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Settings
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 3
                        ? "text-white bg-purple-600"
                        : "text-purple-600 bg-white")
                    }
                    onClick={e => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                    Options
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                      <p>
                        Collaboratively administrate empowered markets via
                        plug-and-play networks. Dynamically procrastinate B2C users
                        after installed base benefits.
                        <br />
                        <br /> Dramatically visualize customer directed convergence
                        without revolutionary ROI.
                      </p>
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <p>
                        Completely synergize resource taxing relationships via
                        premier niche markets. Professionally cultivate one-to-one
                        customer service with robust ideas.
                        <br />
                        <br />
                        Dynamically innovate resource-leveling customer service for
                        state of the art customer service.
                      </p>
                    </div>
                    <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                      <p>
                        Efficiently unleash cross-media information without
                        cross-media value. Quickly maximize timely deliverables for
                        real-time schemas.
                        <br />
                        <br /> Dramatically maintain clicks-and-mortar solutions
                        without functional solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </Layout>
  );
}
