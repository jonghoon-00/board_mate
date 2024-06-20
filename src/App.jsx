import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { QueryProvider } from './query/QueryProvider';
import { router } from './routes/router';

const Globalstyle = createGlobalStyle`
  ${reset}
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");

<<<<<<< HEAD
  * {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
      "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", sans-serif !important;
  }
=======
 *{
	font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
		"Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
		"Segoe UI Symbol", sans-serif !important;
}
>>>>>>> e1ce6c4 (feat : css완 ~ ㅋㅋ ~)

`;

function App() {
  return (
    <>
      <Globalstyle />
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </>
  );
}

export default App;
