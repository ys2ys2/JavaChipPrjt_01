import React, { useEffect, useState } from 'react';
import { fetchRankingList, updateRankingLike } from '../api/rankApi';
import './RankingList.css';  // CSS 파일을 import

const RankingList = () => {
    const [ranks, setRanks] = useState([]); 
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRankingList(); 
                console.log(data);  // 데이터 확인용
                if (Array.isArray(data)) {
                    setRanks(data); 
                } else {
                    setRanks([]);  
                    setError('Invalid data format received from API');  
                }
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false);  
            }
        };
    
        fetchData();  
    }, []);  
    
    const handleLike = async (rankId) => {
        try {
            const encodedRankId = encodeURIComponent(rankId);  
    
            const updatedRanks = ranks.map(rank => {
                if (rank.rid === rankId) {  
                    return { ...rank, rlike: parseInt(rank.rlike) + 1 };  
                }
                return rank;
            });

            const sortedRanks = updatedRanks.sort((a, b) => b.rlike - a.rlike);  
    
            setRanks(sortedRanks);  
            await updateRankingLike(encodedRankId);  
        } catch (err) {
            setError(err.message);  
        }
    };

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="ranking-container">
            <h1 className="ranking-title">인기 프로젝트</h1>
            <ul className="ranking-list">
                {ranks.map((rank, index) => {
                    // 첫 번째 항목은 '/funding'으로, 나머지는 '/funding2', '/funding3'... 식으로 설정
                    const link = index === 0 ? '/funding' : `/funding${index + 1}`;
                    
                    return (
                        <li key={rank.rid} className="ranking-item">
                            <div className="ranking-img-container">
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    <img src={`${process.env.PUBLIC_URL}${rank.rimg}`} alt={rank.rtitle} className="ranking-img" />
                                </a>
                            </div>
                            <div className="ranking-position">
                                <strong>{index + 1}</strong> {/* 순위 표시 */}
                            </div>
                            <div className="ranking-description">
                                {rank.rtitle}
                            </div>
                            <div className="ranking-like">
                                <span>{rank.rlike} 명 참여</span>
                                <button className="like-button" onClick={() => handleLike(rank.rid)}>👍</button> {/* 이모티콘으로 변경 */}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RankingList;
