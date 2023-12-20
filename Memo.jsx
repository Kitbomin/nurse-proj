import React, { useState } from 'react';

const Memo = ({ onMemoChange, onNext }) => {
  // useState를 사용하여 메모 상태를 관리합니다.
  const [memo, setMemo] = useState('');

  // 증상이 변경될 때 호출되는 이벤트 핸들러입니다.
  const handleMemoChange = (e) => {
    // 입력된 증상을 상태에 업데이트하고, 부모 컴포넌트로 전달합니다.
    setMemo(e.target.value);
    onMemoChange(e.target.value);
  };

  return (
    <div>
      <h2>증상</h2>
      <label>
        {/* 증상을 입력하는 textarea 요소입니다. */}
        증상을 작성하세요:
        <textarea value={memo} onChange={handleMemoChange}></textarea>
      </label>
      {/* "다음" 버튼, 클릭 시 onNext 함수가 호출됩니다. */}
      <button onClick={onNext}>다음</button>
    </div>
  );
};

export default Memo;
