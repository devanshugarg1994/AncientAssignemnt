
export interface Tween {
    kill: () => void;
}

export default function basicTween(object: PIXI.DisplayObject, toX: number, toY: number, durationMilSec: number,onCompleteCallback?: () => void): Tween {
    const initialX = object.x;
    const initialY = object.y;
    const startTime = Date.now();
    let isKilled = false;

    function update() {
        if (isKilled) {
            PIXI.Ticker.shared.remove(update);
            return;
        }

        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        if (elapsed < durationMilSec) {
            const t = elapsed / durationMilSec;
            object.x = lerp(initialX, toX, t);
            object.y = lerp(initialY, toY, t);
        } else {
            object.x = toX;
            object.y = toY;
            PIXI.Ticker.shared.remove(update);

            if (onCompleteCallback && typeof onCompleteCallback === 'function') {
                onCompleteCallback();
            }
        }
    }

    PIXI.Ticker.shared.add(update);

    return {
        kill: () => {
            isKilled = true;
        },
    };

    function lerp(start: number, end: number, t: number): number {
        return start + (end - start) * t;
    }
    
}