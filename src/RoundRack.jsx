import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import Swal from "sweetalert2";
import styles from "@/UI/UI.module.scss";
import { ProductService } from "./api/shopifyAPIService";
import { useComponentStore } from "./stores/ZustandStores";
import { useGLTFWithKTX2 } from "./useGTLFwithKTX";
import { RigidBody } from "@react-three/rapier";
import { Raycaster, Vector2 } from "three";

export function RoundRack(props) {
  const { nodes, materials } = useGLTFWithKTX2("/RoundRack.glb");
  const groupRef = useRef();
  const { camera, scene } = useThree();
  const raycaster = new Raycaster();
  const pointer = new Vector2();

  const { openModal, setSelectedProduct, products, setProducts } =
    useComponentStore();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const handleClick = (event) => {
    event.stopPropagation();

    // Check if it's a touch event
    const isTouch = event.nativeEvent instanceof TouchEvent;

    if (isTouch) {
      // Handle touch events
      const touch = event.nativeEvent.touches[0];
      pointer.x = (touch.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    } else {
      // Handle mouse events - use center of screen when pointer locked
      if (document.pointerLockElement) {
        pointer.x = 0;
        pointer.y = 0;
      } else {
        pointer.x = (event.nativeEvent.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.nativeEvent.clientY / window.innerHeight) * 2 + 1;
      }
    }

    // Update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    // Get all meshes in the group
    const meshes = [];
    groupRef.current.traverse((child) => {
      if (child.isMesh) {
        meshes.push(child);
      }
    });

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      // Get the first intersected object
      const firstHit = intersects[0].object;
      
      // Find the parent group that contains the product ID
      let currentParent = firstHit.parent;
      while (currentParent && !currentParent.userData.productId) {
        currentParent = currentParent.parent;
      }

      if (currentParent && currentParent.userData.productId) {
        handleProductOpen(currentParent.userData.productId);
      }
    }
  };

  const handleProductOpen = (productId) => {
    if (products && products.length > 0) {
      setSelectedProduct(productId);
      openModal();
    } else {
      const fetchProducts = async () => {
        try {
          const response = await ProductService.getAllProducts();
          setProducts(response);
        } catch (err) {
          console.error(err);
        }
      };
      fetchProducts();

      Swal.fire({
        title: "Could Not Load Product",
        text: "The products couldn't be loaded. Please try again.",
        icon: "error",
        customClass: {
          title: styles.swalTitle,
          popup: styles.swalPopup,
        },
      });
    }
  };

  return (
    <RigidBody type = "fixed">
    <group {...props} ref={groupRef} dispose={null} onClick={handleClick}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rack_1.geometry}
        material={materials.Bake}
        position={[0, 1.417, 0]}
        scale={9.92}
      />
      <group position={[12.498, 27.048, 15.77]} rotation={[0, -0.92, 0]} scale={2.366} userData={{ productId: 9688999952677 }}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_102_1.geometry}
          material={materials['st_metal_2.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_102_2.geometry}
          material={materials['wood.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_102_3.geometry}
          material={materials['Front.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_102_4.geometry}
          material={materials['Sleeves.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_102_5.geometry}
          material={materials['Back.001']}
        />
      </group>
      <group
        position={[-7.578, 11.507, 10.105]}
        rotation={[-Math.PI / 2, 0, -2.253]}
        scale={25.685}
        userData={{ productId: 9729009615141 }}
        >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_115_1.geometry}
          material={materials['Sleeves.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_115_2.geometry}
          material={materials['Back.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_115_3.geometry}
          material={materials.Front}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_115_4.geometry}
          material={materials['st_metal_2.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_115_5.geometry}
          material={materials['wood.001']}
        />
      </group>
      <group position={[10.43, 11.496, -6.824]} rotation={[-Math.PI / 2, 0, 0.362]} scale={25.685} userData={{ productId: 9729030488357 }}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_106_1.geometry}
          material={materials['Sleeves.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_106_2.geometry}
          material={materials['Back.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_106_3.geometry}
          material={materials['Front.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_106_4.geometry}
          material={materials['st_metal_2.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_106_5.geometry}
          material={materials['wood.003']}
        />
      </group>
      <group position={[12.203, 11.549, 4.029]} rotation={[-Math.PI / 2, 0, -0.173]} scale={25.685} userData={{ productId: 9689001328933 }}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_104_1.geometry}
          material={materials['Back.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_104_2.geometry}
          material={materials['st_metal_2.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_104_3.geometry}
          material={materials['wood.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_104_4.geometry}
          material={materials['Front.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_104_5.geometry}
          material={materials['Sleeves.004']}
        />
      </group>
      <group
        position={[-11.328, 11.539, 5.991]}
        rotation={[-Math.PI / 2, 0, -2.543]}
        scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_114_1.geometry}
          material={materials['Back.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_114_2.geometry}
          material={materials['st_metal_2.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_114_3.geometry}
          material={materials['wood.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_114_4.geometry}
          material={materials['Front.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_114_5.geometry}
          material={materials['Sleeves.005']}
        />
      </group>
      <group position={[-9.578, 11.453, -8.578]} rotation={[-Math.PI / 2, 0, 2.565]} scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_111_1.geometry}
          material={materials['Back.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_111_2.geometry}
          material={materials['st_metal_2.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_111_3.geometry}
          material={materials['wood.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_111_4.geometry}
          material={materials['Front.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_111_5.geometry}
          material={materials['Sleeves.006']}
        />
      </group>
      <group
        position={[-12.079, 11.516, -4.705]}
        rotation={[-Math.PI / 2, 0, 2.969]}
        scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_112_1.geometry}
          material={materials['Sleeves.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_112_2.geometry}
          material={materials['Back.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_112_3.geometry}
          material={materials['Front.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_112_4.geometry}
          material={materials['st_metal_2.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_112_5.geometry}
          material={materials['wood.007']}
        />
      </group>
      <group
        position={[-1.708, 11.528, -12.498]}
        rotation={[-Math.PI / 2, 0, 1.718]}
        scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_109_1.geometry}
          material={materials['Sleeves.008']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_109_2.geometry}
          material={materials['Back.008']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_109_3.geometry}
          material={materials['Front.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_109_4.geometry}
          material={materials['st_metal_2.008']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_109_5.geometry}
          material={materials['wood.008']}
        />
      </group>
      <group position={[1.496, 11.56, 12.797]} rotation={[-Math.PI / 2, 0, -1.268]} scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_101_1.geometry}
          material={materials['Back.009']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_101_2.geometry}
          material={materials['st_metal_2.009']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_101_3.geometry}
          material={materials['wood.009']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_101_4.geometry}
          material={materials['Front.008']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_101_5.geometry}
          material={materials['Sleeves.009']}
        />
      </group>
      <group position={[-12.529, 11.56, 1.839]} rotation={[-Math.PI / 2, 0, -2.974]} scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_113_1.geometry}
          material={materials['Front.009']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_113_2.geometry}
          material={materials['st_metal_2.010']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_113_3.geometry}
          material={materials['wood.010']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_113_4.geometry}
          material={materials['Sleeves.010']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_113_5.geometry}
          material={materials['Back.010']}
        />
      </group>
      <group
        position={[-3.739, 11.558, 12.055]}
        rotation={[-Math.PI / 2, 0, -1.859]}
        scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_116_1.geometry}
          material={materials['Back.011']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_116_2.geometry}
          material={materials['st_metal_2.011']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_116_3.geometry}
          material={materials['wood.011']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_116_4.geometry}
          material={materials['Front.010']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_116_5.geometry}
          material={materials['Sleeves.011']}
        />
      </group>
      <group position={[3.003, 11.495, -12.313]} rotation={[-Math.PI / 2, 0, 1.384]} scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_108_1.geometry}
          material={materials['Front.011']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_108_2.geometry}
          material={materials['st_metal_2.012']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_108_3.geometry}
          material={materials['wood.012']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_108_4.geometry}
          material={materials['Sleeves.012']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_108_5.geometry}
          material={materials['Back.012']}
        />
      </group>
      <group position={[9.985, 11.585, 7.847]} rotation={[-Math.PI / 2, 0, -0.577]} scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_103_1.geometry}
          material={materials['Back.013']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_103_2.geometry}
          material={materials['st_metal_2.013']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_103_3.geometry}
          material={materials['wood.013']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_103_4.geometry}
          material={materials['Front.012']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_103_5.geometry}
          material={materials['Sleeves.013']}
        />
      </group>
      <group position={[12.607, 11.47, -0.923]} rotation={[-Math.PI / 2, 0, 0.111]} scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_105_1.geometry}
          material={materials['Sleeves.014']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_105_2.geometry}
          material={materials['Back.014']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_105_3.geometry}
          material={materials['Front.013']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_105_4.geometry}
          material={materials['st_metal_2.014']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_105_5.geometry}
          material={materials['wood.014']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_105_6.geometry}
          material={materials['Material.001']}
        />
      </group>
      <group position={[7.918, 11.542, -9.867]} rotation={[-Math.PI / 2, 0, 0.982]} scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_107_1.geometry}
          material={materials['Front.014']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_107_2.geometry}
          material={materials['st_metal_2.015']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_107_3.geometry}
          material={materials['wood.015']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_107_4.geometry}
          material={materials['Sleeves.015']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_107_5.geometry}
          material={materials['Back.015']}
        />
      </group>
      <group
        position={[-5.119, 11.561, -11.977]}
        rotation={[-Math.PI / 2, 0, 2.208]}
        scale={25.685}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_110_1.geometry}
          material={materials['Back.016']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_110_2.geometry}
          material={materials['st_metal_2.016']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_110_3.geometry}
          material={materials['wood.016']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_110_4.geometry}
          material={materials['Front.015']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_110_5.geometry}
          material={materials['Sleeves.016']}
        />
      </group>
    </group>
  
    </RigidBody>
  );
}
