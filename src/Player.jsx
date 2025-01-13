import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import { usePersonControls } from "@/hooks.js";
import { useFrame, useThree } from "@react-three/fiber";
import nipplejs from "nipplejs";
import gsap from "gsap";
import { useComponentStore, useTouchStore } from "./stores/ZustandStores";
import { CameraController } from "./CameraController";

const MOVE_SPEED = 1;
const TOUCH_SENSITIVITY = {
  PORTRAIT: {
    x: 0.004, // Reduced horizontal sensitivity in landscape
    y: 0.004, // Reduced vertical sensitivity in portrait
  },
  LANDSCAPE: {
    x: 0.004, // Reduced horizontal sensitivity in landscape
    y: 0.004, // Increased vertical sensitivity in landscape
  },
};

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

const RESPAWN_HEIGHT = -2;
const START_POSITION = new THREE.Vector3(0, 0.3, 0);

export const Player = () => {
  const playerRef = useRef();
  const touchRef = useRef({
    cameraTouch: null,
    previousCameraTouch: null,
  });
  const { forward, backward, left, right, jump } = usePersonControls();
  const [canJump, setCanJump] = useState(true);
  const [isAnimating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|Opera Mini|Kindle|Silk|Mobile|Tablet|Touch/i.test(
      navigator.userAgent
    )
  );
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const { camera } = useThree();

  const rapier = useRapier();

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleOrientationChange);
    handleOrientationChange();

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    // Initialize the joystick
    const joystickZone = document.createElement("div");
    joystickZone.id = "joystickZone";
    joystickZone.style.position = "absolute";
    joystickZone.style.bottom = "15vh"; // Adjust for visibility
    joystickZone.style.left = "13vw"; // Adjust for visibility
    joystickZone.style.width = "150px";
    joystickZone.style.height = "150px";
    joystickZone.style.zIndex = "3"; //Higher than UI wafer z index = 2
    joystickZone.style.pointerEvents = "all"; // Ensure interactions are captured
    document.body.appendChild(joystickZone);

    const JOYSTICK_SIZE = 130; // pixels
    const PORTRAIT_MARGIN = {
      bottom: 70, // pixels from edge
      left: 80,
    };
    const LANDSCAPE_MARGIN = {
      bottom: 80, // smaller bottom margin for landscape
      left: 120, // larger left margin for landscape
    };

    // Function to calculate position based on screen size and orientation
    const calculatePosition = () => {
      // Get current viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Determine if we're in landscape mode
      const isLandscape = viewportWidth > viewportHeight;

      // Use different margins based on orientation
      const margins = isLandscape ? LANDSCAPE_MARGIN : PORTRAIT_MARGIN;

      // Calculate position with orientation-specific adjustments
      const bottom = isLandscape
        ? Math.min(margins.bottom, viewportHeight * 0.45) // 15% in landscape
        : Math.min(margins.bottom, viewportHeight * 0.01); // 10% in portrait

      const left = isLandscape
        ? Math.min(margins.left, viewportWidth * 0.08) // 8% in landscape
        : Math.min(margins.left, viewportWidth * 0.12); // 12% in portrait

      return {
        bottom: `${bottom}px`,
        left: `${left}px`,
      };
    };

    const manager = nipplejs.create({
      zone: joystickZone,
      size: JOYSTICK_SIZE,
      mode: "static",
      // position: { bottom: "10vh", left: "12vw" },
      position: calculatePosition(),
      color: "black",
      dynamicPage: true,
    });

    const handleMove = (evt, data) => {
      if (!data) return;

      const { angle, distance } = data;
      const radian = angle.radian; // Align with THREE.js coordinate system
      const speed = (distance / 100) * MOVE_SPEED;

      direction.set(Math.cos(radian) * speed, 0, -Math.sin(radian) * speed * 2);
    };

    const handleEnd = () => {
      direction.set(0, 0, 0);
    };

    manager.on("move", handleMove);
    manager.on("end", handleEnd);

    return () => {
      manager.destroy();
      document.body.removeChild(joystickZone);
    };
  }, [isMobile]);

  const initialTourComplete = useRef(false);
  const { 
    isModalOpen, isCartOpen, isWishlistOpen, crosshairVisible ,
    isInfoModalOpen , isDiscountModalOpen , isSettingsModalOpen , isTermsModalOpen , isContactModalOpen, isProductSearcherOpen
  } = useComponentStore();

  const { isTouchEnabled, enableTouch} = useTouchStore();



  useEffect(() => {
    if (!playerRef.current || initialTourComplete.current) return;
  
    // Set initial position off-screen
    const startPosition = new THREE.Vector3(4, 0.5, 0);
    playerRef.current.setTranslation(startPosition);
    camera.position.copy(startPosition);
    camera.rotation.set(0, -Math.PI / 2, 0); 
  
    // Single smooth transition to spawn point
    const timeline = gsap.timeline({
      onComplete: () => {
        initialTourComplete.current = true;
        enableTouch();
  
        // Reset physics state
        playerRef.current.setLinvel({ x: 0, y: 0, z: 0 });
        playerRef.current.setAngvel({ x: 0, y: 0, z: 0 });
      },
    });
  
    // Add 360-degree spin around the current position
    timeline.to(camera.rotation, {
      duration: 5, // Time to complete the 360-degree rotation
      y: camera.rotation.y + Math.PI * 2, // A full 360-degree rotation
      ease: "power2.inOut",
      onUpdate: () => {
        // Sync player position to the camera's during rotation
        if (playerRef.current) {
          playerRef.current.setTranslation(camera.position);
        }
        
        // Adjust FOV for mobile
        if (isMobile && isPortrait) {
          const targetFOV = 90; // Target FOV for mobile
          const currentFOV = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.05);
          camera.fov = currentFOV;
          camera.updateProjectionMatrix();
        }
      },
    });
  
    // Transition to (0, 0, 0) after the spin
    timeline.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 0,
      ease: "power2.inOut",
      onUpdate: () => {
        // Sync physics body with camera
        if (playerRef.current) {
          playerRef.current.setTranslation(camera.position);
          playerRef.current.setLinvel({ x: 0, y: 0, z: 0 });
        }
      },
    });
  
  
    const animationFrameId = setInterval(() => {
      if (!playerRef.current || initialTourComplete.current) return;
  
      playerRef.current.wakeUp();
      playerRef.current.setTranslation(camera.position);
      playerRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    }, 1000 / 60);
  
    return () => {
      timeline.kill();
      clearInterval(animationFrameId);
    };
  }, [camera, isMobile , isPortrait]);
  
  

  useEffect(() => {
    const handleTouchStart = (e) => {
      if(!isTouchEnabled) return; // Return if touch is not enabled (during the GSAP load)
      if(isModalOpen || isCartOpen || isWishlistOpen || isInfoModalOpen || isDiscountModalOpen || isSettingsModalOpen || isTermsModalOpen || isContactModalOpen || isProductSearcherOpen || !crosshairVisible) return; // Return if any one of the components is open

      if (e.target.closest("#joystickZone")) return;

      // Find the rightmost touch for camera control
      const touches = Array.from(e.touches);
      const rightmostTouch = touches.reduce((rightmost, touch) => {
        return !rightmost || touch.clientX > rightmost.clientX
          ? touch
          : rightmost;
      }, null);

      if (rightmostTouch) {
        touchRef.current.cameraTouch = rightmostTouch.identifier;
        touchRef.current.previousCameraTouch = {
          x: rightmostTouch.clientX,
          y: rightmostTouch.clientY,
        };
      }
    };

    const handleTouchMove = (e) => {
      //if (!touchRef.current.cameraTouch || !touchRef.current.previousCameraTouch) return;
      if(!isTouchEnabled) return; // Return if touch is not enabled (during the GSAP load)
      if(isModalOpen || isCartOpen || isWishlistOpen || isInfoModalOpen || isDiscountModalOpen || isSettingsModalOpen || isTermsModalOpen || isContactModalOpen || isProductSearcherOpen || !crosshairVisible) return; // Return if any one of the components is open

      const touch = Array.from(e.touches).find(
        (t) => t.identifier === touchRef.current.cameraTouch
      );

      if (!touch) return;

      const deltaX = touch.clientX - touchRef.current.previousCameraTouch.x;
      const deltaY = touch.clientY - touchRef.current.previousCameraTouch.y;

      const sensitivity = TOUCH_SENSITIVITY.PORTRAIT;

      camera.rotation.order = "YXZ";
      camera.rotation.y -= deltaX * sensitivity.x;
      camera.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, camera.rotation.x - deltaY * sensitivity.y)
      );

      touchRef.current.previousCameraTouch = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const handleTouchEnd = (e) => {
      if(!isTouchEnabled) return; // Return if touch is not enabled (during the GSAP load)
      if(isModalOpen || isCartOpen || isWishlistOpen || isInfoModalOpen || isDiscountModalOpen || isSettingsModalOpen || isTermsModalOpen || isContactModalOpen || isProductSearcherOpen || !crosshairVisible) return; // Return if any one of the components is open

      const remainingTouches = Array.from(e.touches);
      if (
        !remainingTouches.some(
          (t) => t.identifier === touchRef.current.cameraTouch
        )
      ) {
        touchRef.current.cameraTouch = null;
        touchRef.current.previousCameraTouch = null;
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [camera, isPortrait, isTouchEnabled, isModalOpen, isCartOpen, isWishlistOpen, isInfoModalOpen,isDiscountModalOpen,isSettingsModalOpen,isTermsModalOpen,isContactModalOpen,crosshairVisible, isProductSearcherOpen]);

  const combinedInput = new THREE.Vector3();
  const movementDirection = new THREE.Vector3();
  useFrame((state) => {
    if (!playerRef.current || isAnimating ) return;

    const { y: playerY } = playerRef.current.translation();
    if (playerY < RESPAWN_HEIGHT) {
      respawnPlayer();
    }

    // Only allow movement when no component is open
    if (!isModalOpen && !isInfoModalOpen && !isCartOpen && !isWishlistOpen && !isDiscountModalOpen && !isSettingsModalOpen && !isTermsModalOpen && !isContactModalOpen && !isProductSearcherOpen && crosshairVisible) {
      const velocity = playerRef.current.linvel();

      // Combine joystick and keyboard inputs
      frontVector.set(0, 0, backward - forward);
      sideVector.set(right - left, 0, 0);

      // Combine inputs into a single movement direction
      combinedInput
        .copy(frontVector)
        .add(sideVector)
        .add(direction)
        .normalize();

      // Apply camera's rotation to align movement with camera orientation
      movementDirection
        .copy(combinedInput)
        .applyQuaternion(state.camera.quaternion) // Rotate input by the camera's orientation
        .normalize()
        .multiplyScalar(MOVE_SPEED);

      // Set the player's velocity based on movement direction
      playerRef.current.wakeUp();
      playerRef.current.setLinvel({
        x: movementDirection.x,
        y: velocity.y,
        z: movementDirection.z,
      });

      if (jump && canJump) {
        doJump();
        setCanJump(false);
        setTimeout(() => setCanJump(true), 500);
      }
    }

    // Sync the camera's position with the player
    const { x, y, z } = playerRef.current.translation();
    const lerpFactor = 0.05; // Adjust this value to control the smoothness (smaller is smoother)
    state.camera.position.lerp({ x, y, z }, lerpFactor);
  });

  const doJump = () => {
    playerRef.current.setLinvel({ x: 0, y: 5, z: 0 });
  };

  // const respawnPlayer = () => {
  //   playerRef.current.setTranslation(START_POSITION);
  //   playerRef.current.setLinvel({ x: 0, y: 0, z: 0 });
  // };

  const respawnPlayer = () => {
    if (!initialTourComplete.current) return; // Don't respawn during initial tour

    playerRef.current.setTranslation(START_POSITION);
    playerRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    playerRef.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  return (
    <RigidBody
      colliders={false}
      mass={1}
      ref={playerRef}
      lockRotations
      canSleep={false}
    >
      <CameraController setAnimating={setAnimating} playerRef={playerRef} />
      <mesh castShadow>
        <CapsuleCollider args={[0.1, 0.2]} />
      </mesh>
    </RigidBody>
  );
};

//canSleep={false} - Sleeping caused problem :(((())))
