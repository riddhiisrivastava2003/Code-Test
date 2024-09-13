import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import EmergencyModal from './components/EmergencyModal';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  // Example patient data with additional fields
  const patient = {
    name: 'Rishi Srivastava',
    age: 45,
    location: 'Room 305, Hospital Wing A',
    emergencyType: 'Cardiac Arrest',
    severity: 'Critical',
    guardianContact: '+91 9621701317',
    locationLat: 40.7128,
    locationLng: -74.0060,
    ambulanceETA: '5 minutes',
    onCallDoctor: 'Dr. Aman Kapoor',
    bedAvailability: {
      ICU: 2,
      ER: 0,
      GeneralWard: 5
    },
    medicalHistory: [
      { date: '2024-01-10', condition: 'Hypertension', treatment: 'Medication' },
      { date: '2023-11-22', condition: 'Diabetes', treatment: 'Insulin' },
      { date: '2022-09-15', condition: 'Asthma', treatment: 'Inhaler' }
    ]
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="App" style={styles.pageContainer}>
      <Container style={styles.container}>
        <Row>
          <Col>
            <h1 style={styles.pageTitle}>HealthHub Emergency Alert System</h1>
            <p style={styles.description}>
              Stay informed and respond swiftly to emergencies with the HealthHub alert system.
            </p>
          </Col>
        </Row>
        <Row style={styles.centerContent}>
          <Col md={6} className="text-center">
            <Button variant="danger" size="lg" onClick={handleOpenModal} style={styles.alertButton}>
              Trigger Emergency Alert
            </Button>
          </Col>
        </Row>

        {/* Modal component for emergency alerts */}
        <EmergencyModal
          show={showModal}
          handleClose={handleCloseModal}
          patient={patient}
        />
      </Container>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: '#e9ecef',
    minHeight: '100vh',
    padding: '50px 0',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  pageTitle: {
    textAlign: 'center',
    color: '#343a40',
    marginBottom: '20px',
    fontSize: '32px',
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: '30px',
    fontSize: '16px',
  },
  alertButton: {
    padding: '15px 25px',
    fontSize: '18px',
    fontWeight: '600',
  },
  centerContent: {
    justifyContent: 'center',
  },
};

export default App;
