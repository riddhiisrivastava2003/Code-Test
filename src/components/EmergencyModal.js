import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

function EmergencyModal({ show, handleClose, patient = {} }) {
  const [vitals, setVitals] = useState({
    heartRate: patient.vitals?.heartRate || 'N/A',
    bloodPressure: patient.vitals?.bloodPressure || 'N/A',
    temperature: patient.vitals?.temperature || 'N/A',
    respiratoryRate: patient.vitals?.respiratoryRate || 'N/A'
  });
  
  const [medications, setMedications] = useState(patient.medications || []);
  const [bedAvailability, setBedAvailability] = useState(patient.bedAvailability || {});
  const [bedBooked, setBedBooked] = useState(null);

  useEffect(() => {
    const updateVitals = () => {
      setVitals({
        heartRate: Math.floor(Math.random() * 100) + 60,
        bloodPressure: `${Math.floor(Math.random() * 40) + 80}/${Math.floor(Math.random() * 30) + 60}`,
        temperature: (Math.random() * 2 + 36).toFixed(1),
        respiratoryRate: Math.floor(Math.random() * 10) + 12
      });
    };

    const interval = setInterval(updateVitals, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCallAmbulance = () => {
    Swal.fire({
      icon: 'info',
      title: 'Ambulance Called',
      text: `An ambulance is on its way to ${patient.location || 'Unknown location'}. Estimated Time of Arrival: ${patient.ambulanceETA || 'Unknown'}.`,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'OK'
    });
  };

  const handleContactGuardian = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Guardian Contacted',
      text: `Contacting guardian at ${patient.guardianContact || 'Unknown contact'}.`,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'OK'
    });
  };

  const handleViewHistory = () => {
    Swal.fire({
      title: 'Patient Medical History',
      html: `<ul>${(patient.medicalHistory || []).map((entry, index) =>
        `<li><strong>${entry.date || 'Unknown date'}:</strong> ${entry.condition || 'Unknown condition'} (Treatment: ${entry.treatment || 'Unknown treatment'})</li>`
      ).join('')}</ul>`,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'OK'
    });
  };

  const handleBookBed = (bedType) => {
    Swal.fire({
      title: 'Book Bed',
      text: `Would you like to book a bed in the ${bedType}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, book now!',
      cancelButtonText: 'No, thanks',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if (result.isConfirmed) {
        // Update bed availability and booked status
        setBedAvailability(prevAvailability => ({
          ...prevAvailability,
          [bedType]: prevAvailability[bedType] - 1
        }));
        setBedBooked(bedType);

        Swal.fire(
          'Bed Booked!',
          `A bed in the ${bedType} has been successfully booked.`,
          'success'
        );
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: 'white', borderBottom: 'none', borderRadius: '8px 8px 0 0' }}>
        <Modal.Title>⚠️ {patient.emergencyType || 'Emergency'}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '20px', borderRadius: '0 0 8px 8px', backgroundColor: '#f8d7da', border: '1px solid #dc3545' }}>
        <h5 style={{ color: '#721c24', marginBottom: '15px', fontSize: '1.25rem', fontWeight: 'bold' }}>
          {patient.severity || 'Severity'} {patient.emergencyType || 'Emergency'}
        </h5>
        <div style={{ marginBottom: '15px' }}>
          <p><strong>Location:</strong> {patient.location || 'N/A'}</p>
          <p><strong>Patient Name:</strong> {patient.name || 'N/A'}</p>
          <p><strong>Patient Age:</strong> {patient.age || 'N/A'}</p>
          <p><strong>Guardian Contact:</strong> {patient.guardianContact || 'N/A'}</p>
        </div>

        <h6 style={{ color: '#721c24', marginTop: '20px', fontWeight: 'bold' }}>Real-Time Vitals</h6>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, marginBottom: '20px' }}>
          <li><strong>Heart Rate:</strong> {vitals.heartRate} bpm</li>
          <li><strong>Blood Pressure:</strong> {vitals.bloodPressure} mmHg</li>
          <li><strong>Temperature:</strong> {vitals.temperature} °C</li>
          <li><strong>Respiratory Rate:</strong> {vitals.respiratoryRate} breaths/min</li>
        </ul>

        <p><strong>Bed Availability:</strong></p>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, marginBottom: '20px' }}>
          {Object.entries(bedAvailability).map(([bedType, count]) => (
            <li key={bedType} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{`${bedType}: ${count > 0 ? `${count} beds available` : 'No beds available'}`}</span>
              {count > 0 && bedBooked !== bedType
                ? <Button variant="danger" size="sm" onClick={() => handleBookBed(bedType)} style={{ fontWeight: 'bold' }}>
                    Book Bed
                  </Button>
                : count === 0
                ? <Button variant="secondary" size="sm" disabled style={{ fontWeight: 'bold' }}>
                    Bed Not Available
                  </Button>
                : <Button variant="success" size="sm" disabled style={{ fontWeight: 'bold' }}>
                    Bed Booked
                  </Button>
              }
            </li>
          ))}
        </ul>
        <p><strong>On-Call Doctor:</strong> {patient.onCallDoctor || 'N/A'}</p>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button variant="danger" onClick={handleViewHistory} style={{ fontWeight: 'bold' }}>
            View Patient History
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: 'none' }}>
        <Button variant="secondary" onClick={handleClose} style={{ fontWeight: 'bold' }}>
          Close
        </Button>
        <Button variant="danger" onClick={handleCallAmbulance} style={{ fontWeight: 'bold' }}>
          Call Ambulance
        </Button>
        <Button variant="warning" onClick={handleContactGuardian} style={{ fontWeight: 'bold' }}>
          Contact Guardian
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmergencyModal;
