import { React, useState } from 'react';
import { useUser } from '../lib/customHooks';
import Layout from '../components/Layout';


export default function Home() {
  const { user, authenticated } = useUser();
  const [openTab, setOpenTab] = useState(1);

  if (!user || !authenticated) {
    console.log("Not getting user in index.js")
    return <Layout>
      <div className="p-16">
        <div className="text-2xl mb-4 font-bold text-blue-900">Home - Client Side Auth</div>
        <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-blue-900" />
      </div>
    </Layout>;
  }

  return (
    <Layout>
      <div className="p-16">
        <div className="text-2xl mb-4 font-bold text-blue-900">Infinity Network</div>
        {
          user &&
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
                    Network Management
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
                    Policy Management
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                      <p>
                        Network Management Stuff
                      </p>
                    </div>
                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                      <p>
                        Policy Management Stuff
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
