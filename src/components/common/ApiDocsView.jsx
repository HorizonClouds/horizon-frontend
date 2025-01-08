import config from '@/config';
import React from 'react';

const ApiDocsView = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">API Documentation</h1>
      <p>Here you can see the links to the Swagger documentation for each microservice:</p>
      <ul className="list-disc list-inside mt-4">
        <li>
          <b>Javier y Marta</b>
          <ul className="list-disc list-inside ml-4">
            <li><a href={`${config.gatewayURL}/feeds/api-docs/#/`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Feeds</a></li>
            <li><a href={`${config.gatewayURL}/chats/api-docs/#/`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Chats</a></li>
          </ul>
        </li>
        <li>
          <b>Claudia y Manuel</b>
          <ul className="list-disc list-inside ml-4">
            <li><a href={`${config.gatewayURL}/itineraries/api-docs/#/`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Itineraries</a></li>
            <li><a href={`${config.gatewayURL}/meteo/api-docs/#/`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Meteo</a></li>
          </ul>
        </li>
        <li>
          <b>Jose y Alex</b>
          <ul className="list-disc list-inside ml-4">
            <li><a href={`${config.gatewayURL}/users/api-docs/#/`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Users</a></li>
          </ul>
        </li>
        <li>
          <b>Luis y Antonio</b>
          <ul className="list-disc list-inside ml-4">
            <li><a href={`${config.gatewayURL}/publications/api-docs/#/`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Publications</a></li>
          </ul>
        </li>
        <li>
          <b>Ismael y Juan</b>
          <ul className="list-disc list-inside ml-4">
            <li><a href={`${config.gatewayURL}/analyticsReports/api-docs/#/`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Analytics Reports</a></li>
            <li><a href={`${config.gatewayURL}/notifications/api-docs/#/`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Notifications</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ApiDocsView;
