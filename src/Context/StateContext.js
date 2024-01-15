import { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMGQ4MzBjYS1mOWI0LTQxZDQtOGFiYy1lNzhiOTRkNGM5ZDYiLCJlbWFpbCI6ImhocXRoYW5nQGdtYWlsLmNvbSIsInR5cGUiOiJBQ0NFU1MiLCJpYXQiOjE3MDUyNTQwNDQsImV4cCI6MTcwNTM0MDQ0NH0.Elc1czGJ_1WSyHpyoGozCJHwJUa8UaxUXjCmPq_wbrs'
  );
  const [refreshToken, setRefreshToken] = useState('');

  const mainCategories = {
    didau: {
      id: 'c7a2fe12-21ee-4757-a36d-ed429743b472',
      categoryName: 'Đi đâu',
      description: 'Khám phá các điểm đến du lịch',
    },
    angi: {
      id: '2d06173a-680e-48e8-8068-c53ba4cc2c30',
      categoryName: 'Ăn gì',
      description: 'Khám phá các điểm ẩm thực nổi tiếng',
    },
    odau: {
      id: 'b0186ba0-6710-4fd6-98ac-37d3111643d7',
      categoryName: 'Ở đâu',
      description: 'Khám phá các nơi dừng chân tại địa phương',
    },
    trainghiem: {
      id: 'df8762e6-e127-4e75-ac55-da372c2fcb09',
      categoryName: 'Trải nghiệm',
      description:
        'Khám phá các hoạt động trải nghiệm du lịch tại các thành phố',
    },
  };

  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        user,
        setUser,
        mainCategories,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
