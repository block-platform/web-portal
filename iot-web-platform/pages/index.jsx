import React from 'react';
import { useUser } from '../lib/customHooks';
import Layout from '../components/Layout';

export default function Home() {
  const { user, authenticated } = useUser();
  console.log("klasdjflkadsjflkdjs;lkfj")
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
        <div className="text-2xl mb-4 font-bold text-blue-900">Home - Client Side Auth</div>
        {
          user &&
          <div>
            <div className="text-lg mb-2"> User Details </div>
            <div className="flex">
              <div className="w-24 font-medium">
                <div> Email : </div>
              </div>
              <div>
                <div> {user.email} </div>
              </div>
            </div>
          </div>
        }
      </div>
    </Layout>
  );
}
