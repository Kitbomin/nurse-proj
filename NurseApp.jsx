import React, { useState } from 'react';
import PatientForm from './PatientForm';
import DiagnosisChecklist from './DiagnosisChecklist';
import Memo from './Memo';
import App from './App.css';

// NurseApp 컴포넌트는 환자 정보를 관리하고 다양한 화면을 제어하는 부모 컴포넌트입니다.
const NurseApp = () => {
  // 초기 환자 상태를 정의합니다.
  const initialPatientState = { name: '', diagnoses: [], memo: '' };

  // 환자 목록, 현재 선택된 환자의 인덱스, 현재 선택된 환자, 단계, 검색어, 전체 메모 표시 여부를 상태로 관리합니다.
  const [patients, setPatients] = useState([]);
  const [currentPatientIndex, setCurrentPatientIndex] = useState(-1);
  const [currentPatient, setCurrentPatient] = useState(initialPatientState);
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFullMemo, setShowFullMemo] = useState(false);

  // 환자를 등록하거나 선택할 때 호출되는 함수입니다.
  const handlePatientSubmit = (name) => {
    const existingPatientIndex = patients.findIndex((patient) => patient.name === name);
    if (existingPatientIndex !== -1) {
      // 이미 존재하는 환자일 경우 해당 환자를 선택합니다.
      setCurrentPatient(patients[existingPatientIndex]);
      setCurrentPatientIndex(existingPatientIndex);
    } else {
      // 새로운 환자일 경우 초기 상태로 설정하고 다음 단계로 진행합니다.
      setCurrentPatient({ ...currentPatient, name });
      setStep(2);
    }
  };

  // 진단 항목이 변경되었을 때 호출되는 함수입니다.
  const handleDiagnosisChange = (diagnoses) => {
    setCurrentPatient({ ...currentPatient, diagnoses });
  };

  // 메모가 변경되었을 때 호출되는 함수입니다.
  const handleMemoChange = (memo) => {
    setCurrentPatient({ ...currentPatient, memo });
  };

  // 다음 단계로 진행할 때 호출되는 함수입니다.
  const handleNextStep = () => {
    // 세 번째 단계에서는 현재 환자를 환자 목록에 추가 또는 업데이트합니다.
    if (step === 3) {
      const updatedPatients = [...patients];
      if (currentPatientIndex !== -1) {
        updatedPatients[currentPatientIndex] = currentPatient;
      } else {
        updatedPatients.push(currentPatient);
      }
      setPatients(updatedPatients);
      // 현재 환자 상태를 초기 상태로 설정하고 현재 선택된 환자 인덱스를 초기화합니다.
      setCurrentPatient(initialPatientState);
      setCurrentPatientIndex(-1);
    }
    // 다음 단계로 이동하고 전체 메모 표시를 초기화합니다.
    setStep(step + 1);
    setShowFullMemo(false);
  };

  // 처음으로 돌아갈 때 호출되는 함수입니다.
  const handleReset = () => {
    // 현재 환자 상태를 초기 상태로 설정하고 단계를 첫 번째 단계로 초기화합니다.
    setCurrentPatient(initialPatientState);
    setStep(1);
    // 검색어와 전체 메모 표시를 초기화합니다.
    setSearchTerm('');
    setShowFullMemo(false);
  };

  // 등록된 환자 목록을 보기 위해 호출되는 함수입니다.
  const handleViewPatients = () => {
    // 네 번째 단계로 이동합니다.
    setStep(4);
  };

  // 환자를 삭제할 때 호출되는 함수입니다.
  const handleDeletePatient = (index) => {
    // 선택된 환자를 제외한 나머지 환자 목록을 업데이트합니다.
    const updatedPatients = patients.filter((_, idx) => idx !== index);
    setPatients(updatedPatients);
  };

  // 환자 정보를 수정할 때 호출되는 함수입니다.
  const handleEditPatient = (index) => {
    // 선택된 환자의 정보를 현재 환자로 설정하고 두 번째 단계로 이동합니다.
    setCurrentPatient(patients[index]);
    setCurrentPatientIndex(index);
    setStep(2);
    // 전체 메모 표시를 초기화합니다.
    setShowFullMemo(false);
  };

  // 검색어에 따라 환자를 필터링합니다.
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="nurse-app-container">
      {step === 1 && ( // 현재 단계(step)가 1일 때 환자 정보를 입력받는 폼과 목록 보기 버튼이 표시됩니다.
        <div>
          <PatientForm onPatientSubmit={handlePatientSubmit} /> {/*환자 정보를 입력*/}
          <button className="nurse-app-button" onClick={handleViewPatients}> {/*목록 보기 버튼 표시*/}
            등록된 환자 목록 보기
          </button>
        </div>
      )}
      {step === 3 && ( // 현재 단계(step)가 3일 때 진단 체크리스트가 표시됩니다.
        <DiagnosisChecklist // 진단 체크리스트 표시.
          diagnoses={currentPatient.diagnoses}
          onDiagnosisChange={handleDiagnosisChange}
          onNext={handleNextStep}
        />
      )}
      {step === 2 && <Memo onMemoChange={handleMemoChange} onNext={handleNextStep} />} 

      {step > 3 && ( // 현재 단계(step)가 3보다 큰 경우 등록된 환자 목록과 관련된 기능이 표시됩니다.
        <div>
          <h2>등록된 환자 목록</h2>
          <div>
            <input // 등록된 환자 목록에서 이름 검색기능
              type="text"
              placeholder="환자 이름 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul>
            {filteredPatients.length > 0 ? ( // 등록된 환자가 있고 검색 결과가 있을 경우
              filteredPatients.map((patient, index) => ( // 각 환자에 대한 목록을 생성합니다.
                <li key={index}>
                  <strong>{patient.name}</strong> :{patient.memo}와(과) 관련된 진단:  {/* 환자 이름을 강조하여 표시합니다. */}
                  {patient.memo.length > 30 && !showFullMemo ? (   // 메모가 30자 이상이고 전체 메모가 아직 표시되지 않은 경우
                    <>
                      {patient.memo.slice(0, 30)}... {/* 메모를 30자까지만 표시하고 뒤에 "..."을 추가합니다. */}
                      <button onClick={() => setShowFullMemo(true)}>더보기</button> {/* "더보기" 버튼을 클릭하면 전체 메모를 표시하도록 설정합니다. */}
                    </>
                  ) : ( 
                    patient.diagnoses // 메모가 30자 미만이거나 전체 메모가 표시된 경우
                  )}
                  <button onClick={() => handleEditPatient(index)}>수정</button>  {/* 환자 정보 수정을 위한 버튼 */}
                  <button onClick={() => handleDeletePatient(index)}>삭제</button>  {/* 환자 삭제를 위한 버튼 */}
                </li>
              ))
            ) : (
              <p>등록된 환자가 없거나 검색 결과가 없습니다.</p>  // 등록된 환자가 없거나 검색 결과가 없을 경우
            )}
          </ul>
          <button onClick={handleReset}>처음으로 돌아가기</button> {/*처음으로 돌아가기 버튼을 통해 초기 상태로 되돌아갈 수 있습니다. */}
        </div>
      )}
    </div>
  );
};

export default NurseApp;
