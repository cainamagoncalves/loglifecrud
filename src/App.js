import { InsertClients } from './pages/InsertClients'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';

import './styles/global.scss'
import { LoginPage } from './pages/LoginPage'
import { ToastContainer } from 'react-toastify';
import { ClientsProvider } from './ClientsContexts';
import { TableOfClients } from './pages/TableOfClients';
import { useState } from 'react';
import { EditClientModal } from './components/EditClientModal';

export function App() {
  const [isEditClientModalOpen, setEditClientModalOpen] = useState(false);

  function handleIsEditClientModalOpen() {
    setEditClientModalOpen(true);
  }

  function handleIsEditClientModalClose() {
    setEditClientModalOpen(false);
  }


  return (
    <BrowserRouter>
      <ClientsProvider>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/home" component={InsertClients} />
          <Route path="/clients" component={() => <TableOfClients handleOpenEditClientModal={handleIsEditClientModalOpen} />} />
        </Switch>
        <EditClientModal
          isOpen={isEditClientModalOpen}
          onRequestClose={handleIsEditClientModalClose}
        />
        <ToastContainer />
      </ClientsProvider>
    </BrowserRouter>
  );
}
