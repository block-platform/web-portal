import { React, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../lib/customHooks';
import Layout from '../components/Layout';
import { API_ROUTES } from '../utils/constants';
import axios from 'axios';

// Table imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Home() {
  const { user, authenticated, token } = useUser();
  const [openTab, setOpenTab] = useState(0);
  const [networkData, setNetworkData] = useState([]);
  const [policyData, setPolicyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Device data
  const [deviceName, setDeviceName] = useState('');
  const [deviceOwner, setDeviceOwner] = useState('');
  const [deviceRegion, setDeviceRegion] = useState('');
  const [deviceID, setDeviceID] = useState('');

  // Policy data
  const [policyDeviceID, setPolicyDeviceID] = useState('');
  const [policyAccessID, setPolicyAccessID] = useState('');

  // Client data
  const [clientEmail, setClientEmail] = useState('');
  const [clientPassword, setClientPassword] = useState('');
  const [clientAccessEmail, setClientAccessEmail] = useState('');
  const [clientAccessDevice, setClientAccessDevice] = useState('');

  const [clientEmailFetchData, setClientEmailFetchData] = useState('');
  const [clientPasswordFetchData, setClientPasswordFetchData] = useState('');
  const [deviceIDFetchData, setDeviceIDFetchData] = useState('');

  const [deviceData, setDeviceData] = useState(null);

  useEffect(() => {
    fetchNetworkData();
    fetchPolicyData();
  }, [token]);

  const fetchNetworkData = () => {
    fetch(API_ROUTES.GET_NETWORK_DATA, {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Network data: ", response);
        if (response?.devices) {
          setNetworkData(response.devices);
        }
      });
  };

  const fetchPolicyData = () => {
    console.log("Fetching policy data");

    fetch(API_ROUTES.GET_POLICY_DATA, {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Policy data: ", response);
        if (response?.policies) {
          setPolicyData(response.policies);
        }
      });
  };

  // Sign up handler for client registration
  const registerClient = async () => {
    try {
      setIsLoading(true);
      console.log("Making request to register client");
      const response = await axios({
        method: 'post',
        url: API_ROUTES.REGISTER_CLIENT,
        data: {
          "email": clientEmail,
          "password": clientPassword,
          "token": token,
        }
      });
      console.log("Got back response from server: ", response);
      if (response.status !== 200) {
        console.log('Something went wrong during registering the client: ', response);
        toast.error("Error registering the client");
        return;
      } else {
        console.log("Client registered successfully");
        toast.success("Client registered successfully!");
        setClientEmail('');
        setClientPassword('');
      }
    }
    catch (err) {
      console.log('Some error occured during registering the client: ', err);
      toast.error("Error registering the client");
    }
    finally {
      setIsLoading(false);
    }
  };

  // Handler for providing client access to device
  const clientAccess = async () => {
    try {
      setIsLoading(true);
      console.log("Making request to add client access");
      const response = await axios({
        method: 'post',
        url: API_ROUTES.SET_POLICY,
        data: {
          "device_id": clientAccessDevice,
          "accessing_device_id": [],
          "accessing_user_id": [clientAccessEmail],
          "token": token,
        }
      });
      console.log("Got back response from server: ", response);
      if (response.status !== 200) {
        console.log('Something went wrong while providing access to the client: ', response);
        toast.error("Error providing access to client");
        return;
      } else {
        console.log("Client provided access successfully");
        toast.success("Client provided access successfully!");
        setClientAccessEmail('');
        setClientAccessDevice('');
      }
    }
    catch (err) {
      console.log('Some error occured while providing the client access: ', err);
      toast.error("Error providing access to client");
    }
    finally {
      setIsLoading(false);
      fetchPolicyData();
    }
  };

  // Handler for registering a device
  const registerDevice = async () => {
    try {
      setIsLoading(true);
      console.log("Making request to register a device");
      const response = await axios({
        method: 'post',
        url: API_ROUTES.REGISTER_DEVICE,
        data: {
          "name": deviceName,
          "owner": deviceOwner,
          "region": deviceRegion,
          "token": token,
          "id": deviceID,
        }
      });
      console.log("Got back response from server: ", response);
      if (response.status !== 200) {
        console.log('Something went wrong while trying to register the device: ', response);
        toast.error("Error registering device");
        return;
      } else {
        console.log("Device registered successfully");
        toast.success("Device registered successfully!");
        setDeviceName('');
        setDeviceOwner('');
        setDeviceRegion('');
      }
    }
    catch (err) {
      console.log('Some error occured while registering the device: ', err);
      toast.error("Error registering deivce");
    }
    finally {
      setIsLoading(false);
      fetchNetworkData();
    }
  };

  // Handler for creating a policy
  const createPolicy = async () => {
    try {
      setIsLoading(true);
      console.log("Making request to create a policy");
      const response = await axios({
        method: 'post',
        url: API_ROUTES.SET_POLICY,
        data: {
          "device_id": policyDeviceID,
          "accessing_device_id": [policyAccessID],
          "accessing_user_id": [],
          "token": token,
        }
      });
      console.log("Got back response from server: ", response);
      if (response.status !== 200) {
        console.log('Something went wrong while creating the policy: ', response);
        toast.error("Error creating policy");
        return;
      } else {
        console.log("Policy created successfully");
        toast.success("Policy created successfully!");
        setPolicyDeviceID('');
        setPolicyAccessID('');
      }
    }
    catch (err) {
      console.log('Some error occured while creating the policy: ', err);
      toast.error("Error creating policy");
    }
    finally {
      setIsLoading(false);
      fetchPolicyData();
    }
  };

  // Handler for creating a policy
  const fetchDeviceData = async () => {
    try {
      setIsLoading(true);
      console.log("Making request to fetch device data");
      const response = await axios({
        method: 'post',
        url: API_ROUTES.GET_DEVICE_DATA,
        data: {
          "device_id": deviceIDFetchData,
          "token": token,
        }
      });
      console.log("Got back response from server for device data fetch: ", response);
      if (response.status !== 200) {
        console.log('Something went wrong while fetching device data: ', response);
        toast.error("Error fetching device data");
        return;
      } else {
        console.log("Device data fetched successfully");
        // console.log("Response is ")
        // console.log(response.data.data)
        setDeviceData(response.data.data);
      }
    }
    catch (err) {
      console.log('Some error occured fetching device data: ', err);
      toast.error("Error fetching deivce data");
    }
    finally {
      setIsLoading(false);
    }
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
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "red",
              },
            },
          }}
        />
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
                        (openTab === 0
                          ? "text-white bg-purple-600"
                          : "text-purple-600 bg-white")
                      }
                      onClick={e => {
                        e.preventDefault();
                        setOpenTab(0);
                      }}
                      data-toggle="tab"
                      href="#link0"
                      role="tablist"
                    >
                      Manage Network
                    </a>
                  </li>
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
                      Manage Policy
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
                      Manage Client
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
                      Fetch IoT Device Data
                    </a>
                  </li>
                </ul>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="px-4 py-5 flex-auto">
                    <div className="tab-content tab-space">
                      <div className={openTab === 0 ? "block" : "hidden"} id="link1">
                        <div className="flex flex-row">
                          <div className="grow">
                            <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} aria-label="network data table">
                                <TableHead>
                                  <TableRow
                                    sx={{
                                      "& th": {
                                        fontWeight: "bold",
                                        color: "rgba(96, 96, 96)"
                                      }
                                    }}>
                                    <TableCell>Device Name</TableCell>
                                    <TableCell>Device ID</TableCell>
                                    <TableCell>Region</TableCell>
                                    <TableCell>IPFS Hash</TableCell>
                                    <TableCell>Last Updated Time</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {networkData.map((row) => (
                                    <TableRow
                                      key={row.id}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell>{row.id}</TableCell>
                                      <TableCell>{row.region}</TableCell>
                                      <TableCell>{row.ipfs}</TableCell>
                                      <TableCell>{row.updated_at}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                          <div className="flex flex-col ml-5 grow">
                            <span className='mb-2 font-bold text-center'>Register a new device</span>
                            <input
                              className="border-2 outline-none p-2 rounded-md"
                              type="email"
                              placeholder="Name"
                              value={deviceName}
                              onChange={(e) => { setDeviceName(e.target.value); }}
                            />
                            <input
                              className="border-2 outline-none p-2 rounded-md"
                              type="email"
                              placeholder="ID"
                              value={deviceID}
                              onChange={(e) => { setDeviceID(e.target.value); }}
                            />
                            <input
                              className="border-2 outline-none p-2 rounded-md mt-2"
                              type="email"
                              placeholder="Owner" value={deviceOwner}
                              onChange={(e) => { setDeviceOwner(e.target.value); }}
                            />
                            <input
                              className="border-2 outline-none p-2 rounded-md mt-2"
                              type="email"
                              placeholder="Region" value={deviceRegion}
                              onChange={(e) => { setDeviceRegion(e.target.value); }}
                            />

                            <button
                              className="
                                flex justify-center
                                p-2 rounded-md w-1/2 self-center
                                bg-blue-900  text-white 
                                hover:bg-blue-800 mt-5"
                              onClick={registerDevice}
                            >
                              {
                                isLoading ?
                                  <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
                              }
                              <span>
                                Register Device
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={openTab === 1 ? "block" : "hidden"} id="link2">
                        <div className="flex flex-row">
                          <div className="grow">
                            <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} aria-label="policy data table">
                                <TableHead>
                                  <TableRow
                                    sx={{
                                      "& th": {
                                        fontWeight: "bold",
                                        color: "rgba(96, 96, 96)"
                                      }
                                    }}>
                                    <TableCell>Device Name</TableCell>
                                    <TableCell>Authorized Devices</TableCell>
                                    <TableCell>Authorized Users</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {policyData.map((row) => (
                                    <TableRow
                                      key={row.id}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell>{row.authorized_devices?.join(", ")}</TableCell>
                                      <TableCell>{row.authorized_users?.join(", ")}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                          <div className="flex flex-col ml-5 grow">
                            <span className='mb-2 font-bold text-center'>Create Access Policy</span>
                            <input
                              className="border-2 outline-none p-2 rounded-md"
                              type="email"
                              placeholder="Device ID"
                              value={policyDeviceID}
                              onChange={(e) => { setPolicyDeviceID(e.target.value); }}
                            />
                            <input
                              className="border-2 outline-none p-2 rounded-md mt-2"
                              type="email"
                              placeholder="Authorized Devide ID" value={policyAccessID}
                              onChange={(e) => { setPolicyAccessID(e.target.value); }}
                            />

                            <button
                              className="
                                flex justify-center
                                p-2 rounded-md w-1/2 self-center
                                bg-blue-900  text-white 
                                hover:bg-blue-800 mt-5"
                              onClick={createPolicy}
                            >
                              {
                                isLoading ?
                                  <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
                              }
                              <span>
                                Create Policy
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                        <div className="flex flex-row">
                          <div className="flex flex-1 flex-col justify-evenly pr-5">
                            <span className='mb-2 font-bold text-center'>Register a client</span>
                            <input
                              className="border-2 outline-none p-2 rounded-md"
                              type="email"
                              placeholder="Client Email"
                              value={clientEmail}
                              onChange={(e) => { setClientEmail(e.target.value); }}
                            />
                            <input
                              className="border-2 outline-none p-2 rounded-md mt-2"
                              type="password"
                              placeholder="Password" value={clientPassword}
                              onChange={(e) => { setClientPassword(e.target.value); }}
                            />

                            <button
                              className="
                                flex justify-center
                                p-2 rounded-md w-1/2 self-center
                                bg-blue-900  text-white 
                                hover:bg-blue-800 mt-5"
                              onClick={registerClient}
                            >
                              {
                                isLoading ?
                                  <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
                              }
                              <span>
                                Register Client
                              </span>
                            </button>
                          </div>
                          <div className="flex flex-1 flex-col justify-evenly pl-5">
                            <span className='mb-2 font-bold text-center'>Provide access to a device</span>
                            <input
                              className="border-2 outline-none p-2 rounded-md"
                              type="email"
                              placeholder="Client Email"
                              value={clientAccessEmail}
                              onChange={(e) => { setClientAccessEmail(e.target.value); }}
                            />
                            <input
                              className="border-2 outline-none p-2 rounded-md mt-2"
                              type="email"
                              placeholder="Device ID" value={clientAccessDevice}
                              onChange={(e) => { setClientAccessDevice(e.target.value); }}
                            />

                            <button
                              className="
                                flex justify-center
                                p-2 rounded-md w-1/2 self-center
                                bg-blue-900  text-white 
                                hover:bg-blue-800 mt-5"
                              onClick={clientAccess}
                            >
                              {
                                isLoading ?
                                  <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
                              }
                              <span>
                                Provide Access
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                        <div className="flex flex-1 flex-col justify-evenly pr-5">
                          <span className='mb-2 font-bold text-center'>Fetch IoT Device Data From IPFS</span>
                          <input
                            className="border-2 outline-none p-2 rounded-md"
                            type="email"
                            placeholder="Client Email"
                            value={clientEmailFetchData}
                            onChange={(e) => { setClientEmailFetchData(e.target.value); }}
                          />
                          <input
                            className="border-2 outline-none p-2 rounded-md mt-2"
                            type="password"
                            placeholder="Password" value={clientPasswordFetchData}
                            onChange={(e) => { setClientPasswordFetchData(e.target.value); }}
                          />
                          <input
                            className="border-2 outline-none p-2 rounded-md mt-2"
                            type="text"
                            placeholder="Device ID" value={deviceIDFetchData}
                            onChange={(e) => { setDeviceIDFetchData(e.target.value); }}
                          />

                          <button
                            className="
                                flex justify-center
                                p-2 rounded-md w-1/2 self-center
                                bg-blue-900  text-white 
                                hover:bg-blue-800 mt-5"
                            onClick={fetchDeviceData}
                          >
                            {
                              isLoading ?
                                <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
                            }
                            <span>
                              Fetch Data
                            </span>
                          </button>
                        </div>
                        {deviceData ?
                          <div>
                            <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} aria-label="device data table">
                                <TableHead>
                                  <TableRow
                                    sx={{
                                      "& th": {
                                        fontWeight: "bold",
                                        color: "rgba(96, 96, 96)"
                                      }
                                    }}>
                                    <TableCell>Timestamp</TableCell>
                                    <TableCell>Temperature</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {deviceData.map((row) => (
                                    <TableRow
                                      key={row.timestamp}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {row.timestamp}
                                      </TableCell>
                                      <TableCell>{row.temperature}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                          : null}
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