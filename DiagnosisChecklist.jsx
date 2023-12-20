import React, { useState } from 'react';

// 진단 항목과 그에 해당하는 하위 항목들을 정의한 객체입니다.
const diagnosesList = {
  '건강인식': ["운동 참여를 향상을 위한 준비", "지역사회 건강 부족", "비효과적 건강 자기 관리"],
  '영양': ["영양불균형", "불안정한 혈당수치의 위험", ".체액 부족"],
  '배설과교환': ["배뇨장애", "만성 기능적 변비", "설사"],
  '활동/휴식': ["불면증", "에너지 불균형", "비효과적 호흡 양상"],
  '지각/인지': ["편측성 지각이상", "급성 혼동", "언어적 의사소통 장애"],
  '자기 인식': ["자아정체감 혼란", "만성적 자존감 저하", "상황적 자존감 저하"],
  '역할 관계': ["부모 역할 장애", "가족 과정 중단", "부모 역할 갈등"],
  '안전/보호': ["감염의 위험", "수술 부위 감염의 위험", "중독의 위험"]
};

const DiagnosisChecklist = ({ diagnoses, onDiagnosisChange, onNext }) => {
  // 현재 펼쳐진 진단 항목을 상태로 관리합니다.
  const [expandedDiagnosis, setExpandedDiagnosis] = useState(null);

  // 하위 진단 항목이 변경되었을 때 호출되는 함수입니다.
  const handleSubDiagnosisChange = (subDiagnosis) => {
    // 선택된 항목을 현재 진단 목록에 추가 또는 제거하여 업데이트합니다.
    const updatedDiagnoses = diagnoses.includes(subDiagnosis)
      ? diagnoses.filter((d) => d !== subDiagnosis)
      : [...diagnoses, subDiagnosis];

    // 부모 컴포넌트로 변경된 진단 목록을 전달합니다.
    onDiagnosisChange(updatedDiagnoses);
  };

  return (
    <div>
      <h2>진단 체크리스트</h2>
      {/* 진단 항목을 나열하는 리스트와 각 항목의 하위 항목을 펼칠 수 있는 UI를 생성합니다. */}
      <div className="diagnoses-list-container">
        <ul>
          {Object.keys(diagnosesList).map((diagnosis) => (
            <li key={diagnosis} onClick={() => setExpandedDiagnosis(diagnosis)}>
              {diagnosis}
              {expandedDiagnosis === diagnosis && (
                <ul>
                  {/* 각 진단 항목의 하위 항목을 나열하고 체크박스로 선택할 수 있게 합니다. */}
                  {diagnosesList[diagnosis].map((subDiagnosis) => (
                    <li key={subDiagnosis}>
                      <input
                        className='Checkinput'
                        type="checkbox"
                        checked={diagnoses.includes(subDiagnosis)}
                        onChange={() => handleSubDiagnosisChange(subDiagnosis)}
                      />
                      {subDiagnosis}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* "다음" 버튼을 클릭하면 다음 단계로 진행할 수 있습니다. */}
      <button onClick={onNext}>다음</button>
    </div>
  );
};

export default DiagnosisChecklist;
