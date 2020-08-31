import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Button } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";

import Navigation from "../../shared/components/navigation/Navigation";
import SearchInstructorForm from "./components/SearchInstructorForm";
import InstructorTable from "./components/InstructorTable";
import NewInstructorForm from "./components/NewInstructorForm";
import styles from "./Instructor.module.css";

const Instructors = ({ auth }) => {
  const [instructor, setInstructor] = useState();
  const [instructorToEdit, setInstructorToEdit] = useState();
  const [showCreateNew, setShowCreateNew] = useState(false);

  return (
    <>
      {!auth.isLoggedIn && <Redirect to="/login" />}

      <Navigation />
      <Container>
        <div className={styles.newInstructorBtnWrapper}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowCreateNew(!showCreateNew)}
          >
            <FaUserPlus />
          </Button>
        </div>

        <SearchInstructorForm auth={auth} setInstructor={setInstructor} />

        {instructor && (
          <InstructorTable
            instructor={instructor}
            setInstructorToEdit={setInstructorToEdit}
            instructorToEdit={instructorToEdit}
          />
        )}

        {showCreateNew && <NewInstructorForm auth={auth} />}
      </Container>
    </>
  );
};

Instructors.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Instructors);
