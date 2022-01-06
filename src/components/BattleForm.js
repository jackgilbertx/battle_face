import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BattleForm = () => {
  const dispatch = useDispatch();
  const { user, loading, success } = useSelector((state) => state.user);

  useEffect(() => {}, []);

  return <div>form</div>;
};

export default BattleForm;
