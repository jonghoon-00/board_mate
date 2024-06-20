import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

import { useNavigate } from 'react-router-dom';
import {
  StInfoContent,
  StInfoTitle,
  StInfoWindow,
  StLeftSide,
  StLi,
  StListItem,
  StPlaceInfo,
  StSearchBar,
  StUl
} from '../../../pages/SelectPlace/SelectPlace.styled';
// import { StContainer } from '../readPost/readPost.styled';
import {
  StContainer,
  StMapContainer,
  StPlaceDetail,
  StPlaceListDiv,
  StSelectPlaceButton,
  StSelectPlaceInfoPreview,
  StWrap
} from './editPlace.styled';

const PlaceListItem = ({ marker, setInfo, isSelectd }) => {
  // console.log(marker);
  return (
    <StListItem $isSelected={isSelectd}>
      {/* <StDummyImage></StDummyImage> */}
      <StPlaceInfo>
        <h3>{marker.place_name}</h3>
        <p>{marker.category_group_name}</p>
        <p>{marker.road_address_name}</p>
        <p>{marker.phone}</p>
        <StPlaceDetail>
          <a href={marker.place_url} target="_blank">
            자세히 보기
          </a>
          <button
            disabled={isSelectd}
            onClick={() => {
              setInfo(marker);
            }}
          >
            선택
          </button>
        </StPlaceDetail>
      </StPlaceInfo>
    </StListItem>
  );
};

const PlaceInfoCard = ({ marker }) => {
  return (
    <StInfoWindow>
      <h3>{marker.content}</h3>
    </StInfoWindow>
  );
};

export const EditPlace = ({ setIsEditPlace }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [keyword, setKeyword] = useState('보드게임');
  const [inputText, setInputText] = useState('');
  const [places, setPlaces] = useState([]);
  // console.log(places);
  // console.log(markers);

  const handleClickButton = () => {
    setKeyword(inputText);
  };

  const inputChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    // console.log(ps);

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      setPlaces(data);
      // console.log(data, status, _pagination);
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            ...data[i],
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            content: data[i].place_name
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          // console.log(data[i].y, data[i].x);
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
    setLoading(false);
  }, [map, keyword]);

  const mapAddHandler = () => {
    // navigate('/writingpage', { state: { info } });
    console.log(info);
    localStorage.setItem('address', info.road_address_name);
    localStorage.setItem('x', info.x);
    localStorage.setItem('y', info.y);
    setIsEditPlace(false);
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <StContainer>
      <StWrap>
        <StMapContainer>
          <Map // 로드뷰를 표시할 Container
            center={{
              lat: 126.93713158887188,
              lng: 37.5561776340198
            }}
            style={{
              width: '100%',
              height: '600px',
              borderRadius: '10px'
            }}
            level={3}
            onCreate={setMap}
          >
            {markers.map((marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => {
                  setInfo(marker);
                  // console.log(marker);
                }}
              ></MapMarker>
            ))}
            {info && (
              <CustomOverlayMap position={{ lat: info.y, lng: info.x }}>
                <PlaceInfoCard marker={info} />
              </CustomOverlayMap>
            )}
          </Map>
        </StMapContainer>
        <StPlaceListDiv>
          <StLeftSide>
            <StSearchBar>
              <input placeholder="원하는 장소를 검색하세요!" value={inputText} onChange={inputChange} type="text" />
              <button onClick={handleClickButton}>검색</button>
            </StSearchBar>
            <StUl>
              {markers.map((marker) => (
                <StLi key={marker.id}>
                  <PlaceListItem isSelectd={marker.id === info?.id} marker={marker} setInfo={setInfo} />
                </StLi>
              ))}
            </StUl>
          </StLeftSide>
        </StPlaceListDiv>
      </StWrap>

      {info && (
        <StSelectPlaceInfoPreview>
          <StInfoTitle>선택한 주소 정보</StInfoTitle>
          <hr />
          <StInfoContent>{info.content}</StInfoContent>
          <StInfoContent>{info.address_name}</StInfoContent>
          {/* <div>ID : {info.id}</div> */}
          <StSelectPlaceButton onClick={mapAddHandler}>해당 위치 선택</StSelectPlaceButton>
        </StSelectPlaceInfoPreview>
      )}
      {/* <StEditButtonDiv>
        <StEditButton>위치변경</StEditButton>
      </StEditButtonDiv> */}
    </StContainer>
  );
};
