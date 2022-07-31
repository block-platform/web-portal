import { React, useState, useEffect } from 'react';
import { useUser } from '../lib/customHooks';
import Layout from '../components/Layout';
import { API_ROUTES } from '../utils/constants';

// Table imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Home() {
  const { user, authenticated } = useUser();
  const [openTab, setOpenTab] = useState(1);
  const [networkData, setNetworkData] = useState([]);
  const [policyData, setPolicyData] = useState([]);

  useEffect(() => {
    fetchNetworkData();
    fetchPolicyData();
  }, []);

  const fetchNetworkData = () => {
    fetch(API_ROUTES.GET_NETWORK_DATA)
      .then((res) => res.json())
      .then((response) => {
        console.log("Network data: ", response);
        if (response?.devices) {
          setNetworkData(response.devices);
        }
      });
  };

  const fetchPolicyData = () => {
    fetch(API_ROUTES.GET_POLICY_DATA)
      .then((res) => res.json())
      .then((response) => {
        console.log("Policy data: ", response);
        if (response?.policies) {
          setPolicyData(response.policies);
        }
      });
  };

  if (!user || !authenticated) {
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
          <div>
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
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="network data table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Device Name</TableCell>
                                <TableCell>Region</TableCell>
                                <TableCell>IPFS Hash</TableCell>
                                <TableCell>Last Updated Time</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {networkData.map((row) => (
                                <TableRow
                                  key={row.name}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell>{row.region}</TableCell>
                                  <TableCell>{row.ipfs}</TableCell>
                                  <TableCell>{row.updated_at}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                      <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="policy data table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Device Name</TableCell>
                                <TableCell>Authorized Devices</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {policyData.map((row) => (
                                <TableRow
                                  key={row.name}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell>{row.authorized_devices?.join(", ")}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
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
