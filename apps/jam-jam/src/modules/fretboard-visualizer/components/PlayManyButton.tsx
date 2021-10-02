import { SoundOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

interface PlayManyButtonProps {
  onClick: () => void;
}

const PlayManyButton = ({ onClick }: PlayManyButtonProps) => {
  const [loading, setLoading] = useState(false);

  const ref = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    setLoading(true);

    ref.current = setTimeout(() => {
      setLoading(false);
    }, 4000);

    onClick();
  };

  useEffect(() => {
    return () => {
      ref.current && clearInterval(ref.current);
    };
  }, []);

  return (
    <Button
      type="primary"
      shape="circle"
      disabled={loading}
      icon={<SoundOutlined />}
      onClick={handleClick}
    />
  );
};

export { PlayManyButton };
