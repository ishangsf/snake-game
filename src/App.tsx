import React, { useState, useEffect, useCallback } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type ScoreRecord = { name: string; score: number; date: string };

const STORAGE_KEY = 'snake-game-scores';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const App: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('UP');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [highScores, setHighScores] = useState<ScoreRecord[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const savedScores = localStorage.getItem(STORAGE_KEY);
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const checkCollision = (head: Position): boolean => {
    // 检查是否撞墙
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }
    // 检查是否撞到自己
    return snake.slice(1).some(segment => (
      segment.x === head.x && segment.y === head.y
    ));
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (checkCollision(head)) {
        setGameOver(true);
        setShowNameInput(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // 检查是否吃到食物
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
          break;
        case 'ArrowDown':
          setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
          break;
        case 'ArrowLeft':
          setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
          break;
        case 'ArrowRight':
          setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  const saveScore = () => {
    if (!playerName.trim()) return;
    
    const newScore: ScoreRecord = {
      name: playerName,
      score,
      date: new Date().toLocaleDateString()
    };

    const newHighScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setHighScores(newHighScores);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHighScores));
    setShowNameInput(false);
    setPlayerName('');
    resetGame();
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection('UP');
    setGameOver(false);
    setGameStarted(false);
    setScore(0);
    generateFood();
  };
  
  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#282c34',
      color: 'white'
    }}>
      <h1>贪吃蛇游戏</h1>
      <div style={{ marginBottom: '20px' }}>分数: {score}</div>
      {!gameStarted && !gameOver && (
        <button
          onClick={startGame}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          开始游戏
        </button>
      )}
      <div style={{
        position: 'relative',
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
        border: '1px solid #666',
        backgroundColor: '#000'
      }}>
        {snake.map((segment, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: segment.y * CELL_SIZE,
              left: segment.x * CELL_SIZE,
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
              backgroundColor: '#4CAF50'
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            top: food.y * CELL_SIZE,
            left: food.x * CELL_SIZE,
            width: CELL_SIZE - 1,
            height: CELL_SIZE - 1,
            backgroundColor: '#ff0000'
          }}
        />
      </div>
      <button
        onClick={() => setShowLeaderboard(true)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
      >
        查看排行榜
      </button>
      {showLeaderboard && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#282c34',
            padding: '30px',
            borderRadius: '10px',
            width: '400px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0 }}>排行榜</h2>
              <button
                onClick={() => setShowLeaderboard(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#666',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ×
              </button>
            </div>
            {highScores.map((record, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '15px',
                backgroundColor: index === 0 ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: index < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][index] : '#666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                  }}>{index + 1}</span>
                  <span style={{ fontSize: '16px' }}>{record.name}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{record.score}</span>
                  <span style={{ fontSize: '12px', color: '#666' }}>{record.date}</span>
                </div>
              </div>
            ))}
            {highScores.length === 0 && (
              <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                暂无记录
              </div>
            )}
          </div>
        </div>
      )}
      {showNameInput && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#282c34',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h2 style={{ marginBottom: '20px' }}>游戏结束!</h2>
            <p style={{ marginBottom: '20px' }}>得分: {score}</p>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="请输入你的名字"
              style={{
                padding: '10px',
                marginBottom: '20px',
                width: '200px',
                borderRadius: '5px',
                border: '1px solid #666',
                backgroundColor: '#1a1a1a',
                color: 'white'
              }}
            />
            <div>
              <button
                onClick={saveScore}
                disabled={!playerName.trim()}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: playerName.trim() ? '#4CAF50' : '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: playerName.trim() ? 'pointer' : 'not-allowed',
                  marginRight: '10px'
                }}
              >
                保存分数
              </button>
              <button
                onClick={() => {
                  setShowNameInput(false);
                  resetGame();
                }}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                跳过
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;