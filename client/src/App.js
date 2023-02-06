import React, { useState } from 'react';
import { Amplify, Auth, Storage } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

const App = () => {
	const [portfolioData, setPortfolioData] = useState([]);
	const [projUrl, setProjUrl] = useState([]);
	const fetchProjects = async () => {
		try {
			const accessUrl = await Storage.list('/');
			console.log(accessUrl);
			//setPortfolioData(URL.createObjectURL(accessUrl));
			setProjUrl(accessUrl);
		} catch (error) {
			console.log(`Error Access S3 Bucket: ${error}`);
			setPortfolioData([]);
			setProjUrl([]);
		}
	};
	const signOut = async () => {
		try {
			await Auth.signOut({ global: true });
		} catch (error) {
			console.log('error signing out: ', error);
		}
	};
	fetchProjects();
	return (
		<div>
			<Authenticator />
			<p>My Portfolio</p>
			{portfolioData.map((proj, index) => {
				return <p>{proj}</p>;
			})}
			<button onClick={signOut}>Sign Out</button>
		</div>
	);
};

export default withAuthenticator(App);
