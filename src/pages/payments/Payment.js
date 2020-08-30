import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

import SearchUserForm from "./Components/SearchUserForm";
import UserTable from "./Components/UserTable";
import NewPaymentForm from "./Components/NewPaymentForm";
import Navigation from "../../shared/components/navigation/Navigation";

const Payment = ({ auth }) => {
  const [userData, setUserData] = useState();

  return (
    <>
      {!auth.isLoggedIn && <Redirect to="/login" />}
      <Navigation />
      <Container>
        <SearchUserForm setUserData={setUserData} auth={auth} />

        {userData && <UserTable userData={userData} />}

        {userData && <NewPaymentForm auth={auth} userData={userData} />}
      </Container>
    </>
  );
};

Payment.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Payment);
