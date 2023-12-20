import React, { useState } from 'react';

const PatientForm = ({ onPatientSubmit }) => {
  // useState를 사용하여 환자 이름 상태를 관리합니다.
  const [patientName, setPatientName] = useState('');

  // 환자 이름이 변경될 때 호출되는 이벤트 핸들러입니다.
  const handleNameChange = (e) => {
    setPatientName(e.target.value);
  };

  // 폼 제출 시 호출되는 이벤트 핸들러입니다.
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작을 막습니다.
    // 입력된 환자 이름이 공백이 아닌 경우에만 처리합니다.
    if (patientName.trim() !== '') {
      // 부모 컴포넌트로부터 전달받은 onPatientSubmit 함수를 호출하여 환자 이름을 전달합니다.
      onPatientSubmit(patientName);
      // 입력 폼 초기화
      setPatientName('');
    }
  };

  return (
    <div>
      <h2>환자 정보</h2>
      {/* 폼 제출 시 handleSubmit 함수가 호출됩니다. */}
      <form onSubmit={handleSubmit}>
        <label>
          환자 이름:
          {/* 환자 이름을 입력하는 input 요소입니다. */}
          <input type="text" value={patientName} onChange={handleNameChange} />
        </label>
        {/* 폼 제출 버튼입니다. */}
        <button type="submit">다음</button>
      </form>
    </div>
  );
};

export default PatientForm;
