import { React, useState } from 'react';
import { useUser } from '../lib/customHooks';
import Layout from '../components/Layout';

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

  if (!user || !authenticated) {
    console.log("Not getting user in index.js")
    return <Layout>
      <div className="p-16">
        <div className="text-2xl mb-4 font-bold text-blue-900">Home - Client Side Auth</div>
        <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-blue-900" />
      </div>
    </Layout>;
  }

  const rows = [
    { name: "CO2 Sensor", region: "US West", ipfs: "lkasdjf9325kadjsfkj", updated_at: "2020-01-01" },
    { name: "Air Quality Sensor", region: "US East", ipfs: "dsafadsf4tadsfads42", updated_at: "2020-04-19" },
    { name: "Temperature Sensor", region: "US Central", ipfs: "kadsjfki45889tioeqw", updated_at: "2020-05-09" }
  ]

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
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Device Name</TableCell>
                              <TableCell>Region</TableCell>
                              <TableCell>IPFS Hash</TableCell>
                              <TableCell>Last Updated Time</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
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
