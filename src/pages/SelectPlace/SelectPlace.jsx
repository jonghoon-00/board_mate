import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';

import {
  StBackButton,
  StButtons,
  StContainer,
  StDiv,
  StInfoContent,
  StInfoPreview,
  StInfoTitle,
  StInfoWindow,
  StLeftSide,
  StLi,
  StListItem,
  StMapAddButton,
  StMapTitle,
  StPlaceInfo,
  StSearchBar,
  StUl
} from './SelectPlace.styled';

const PlaceListItem = ({ marker, setInfo, isSelectd }) => {
  return (
    <StListItem $isSelected={isSelectd}>
      <StPlaceInfo>
        <h3>{marker.place_name}</h3>
        <p>{marker.category_group_name}</p>
        <p>{marker.road_address_name}</p>
        <p>{marker.phone}</p>
        <StButtons>
          <a href={marker.place_url} target="_blank" rel="noreferrer">
            자세히 보기
          </a>
          <button disabled={isSelectd} onClick={() => setInfo(marker)}>
            선택
          </button>
        </StButtons>
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

export const SelectPlace = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState('보드게임');
  const [inputText, setInputText] = useState('');

  const handleClickButton = () => {
    const next = inputText.trim();
    if (!next) return;
    setKeyword(next);
  };

  useEffect(() => {
    // kakao 로드 체크
    if (!window.kakao?.maps?.services) {
      console.log('Kakao SDK not ready');
      return;
    }

    if (!map) return;

    setLoading(true);

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      try {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const nextMarkers = data.map((d) => {
            const lat = Number(d.y);
            const lng = Number(d.x);
            bounds.extend(new window.kakao.maps.LatLng(lat, lng));
            return {
              ...d,
              position: { lat, lng },
              content: d.place_name,
              id: d.id || d.place_id || `${d.x}-${d.y}` // 고유 식별자 추가
            };
          });

          setMarkers(nextMarkers);
          map.setBounds(bounds);
        } else {
          setMarkers([]);
        }
      } finally {
        setLoading(false);
      }
    });
  }, [map, keyword]);

  const mapAddHandler = () => {
    if (!info) return;
    navigate('/writing-page', { state: { info } });
  };

  return (
    <StContainer>
      <StMapTitle>함께 보드게임할 장소를 검색하고, 선택하세요!</StMapTitle>

      <StDiv>
        <StLeftSide>
          <StSearchBar>
            <input
              placeholder="원하는 장소를 검색하세요!"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              type="text"
            />
            <button onClick={handleClickButton} disabled={isLoading}>
              {isLoading ? '검색 중...' : '검색'}
            </button>
          </StSearchBar>

          <StUl>
            {markers.map((marker) => (
              <StLi key={marker.id}>
                <PlaceListItem isSelectd={marker.id === info?.id} marker={marker} setInfo={setInfo} />
              </StLi>
            ))}
          </StUl>
        </StLeftSide>

        <Map
          center={{
            lat: 37.5561776340198,
            lng: 126.93713158887188
            // lat: 126.93713158887188,
            // lng: 37.5561776340198
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
            <MapMarker key={`marker-${marker.id}`} position={marker.position} onClick={() => setInfo(marker)} />
          ))}

          {info && (
            <CustomOverlayMap
              position={{
                lat: Number(info.y),
                lng: Number(info.x)
              }}
            >
              <PlaceInfoCard marker={info} />
            </CustomOverlayMap>
          )}
        </Map>
      </StDiv>

      {info && (
        <StInfoPreview>
          <StInfoTitle>선택한 주소 정보</StInfoTitle>
          <hr />
          <StInfoContent>장소 : {info.content}</StInfoContent>
          <StInfoContent>주소 : {info.address_name}</StInfoContent>
          <StMapAddButton onClick={mapAddHandler}>장소 등록하기!</StMapAddButton>
        </StInfoPreview>
      )}

      <StBackButton onClick={() => navigate('/')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        나가기
      </StBackButton>
    </StContainer>
  );
};
