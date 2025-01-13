import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Swal from "sweetalert2";
import styles from "@/UI/UI.module.scss";
import { ProductService } from "./api/shopifyAPIService";
import { useComponentStore } from "./stores/ZustandStores";
import { useGLTFWithKTX2 } from "./useGTLFwithKTX";
import { RigidBody } from "@react-three/rapier";

export function RoundRack(props) {
  const { nodes, materials } = useGLTFWithKTX2("/RoundRack.glb");
  const groupRef = useRef();

  const { openModal, setSelectedProduct, products, setProducts } =
    useComponentStore();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004; // Constant rotation along the Y-axis
    }
  });

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
    <group {...props} ref={groupRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rack_1.geometry}
        material={materials.Metal}
        position={[0, 1.3, 0]}
        scale={9.92}
      />
      <group
        position={[3.421, 26.638, 19.861]}
        rotation={[-0.163, -1.395, -0.184]}
        scale={2.583}
        onClick={() => handleProductOpen(9688999952677)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_101_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_101_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_101_3.geometry}
          material={materials["Black 1"]}
        />
      </group>
      <group
        position={[9.719, 26.638, 17.765]}
        rotation={[-0.055, -1.029, -0.07]}
        scale={2.583}
        onClick={() => handleProductOpen(9688999952677)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_102_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_102_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_102_3.geometry}
          material={materials["Black 2"]}
        />
      </group>
      <group
        position={[14.651, 26.638, 13.733]}
        rotation={[-0.041, -0.802, -0.053]}
        scale={2.583}
        onClick={() => handleProductOpen(9688999952677)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_103_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_103_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_103_3.geometry}
          material={materials["Black 3"]}
        />
      </group>
      <group
        position={[18.399, 26.561, 8.146]}
        rotation={[-0.034, -0.598, -0.043]}
        scale={2.583}
        onClick={() => handleProductOpen(9688999952677)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_104_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_104_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_104_3.geometry}
          material={materials["Black 4"]}
        />
      </group>
      <group
        position={[19.022, 26.609, -6.386]}
        rotation={[-0.031, 0.39, -0.012]}
        scale={2.583}
        onClick={() => handleProductOpen(9689001328933)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_105_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_105_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_105_3.geometry}
          material={materials["Green 1"]}
        />
      </group>
      <group
        position={[15.866, 26.65, -12.461]}
        rotation={[-0.039, 0.758, 0.004]}
        scale={2.583}
        onClick={() => handleProductOpen(9689001328933)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_106_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_106_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_106_3.geometry}
          material={materials["Green 2"]}
        />
      </group>
      <group
        position={[10.847, 26.63, -16.852]}
        rotation={[-0.051, 0.985, 0.019]}
        scale={2.583}
        onClick={() => handleProductOpen(9689001328933)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_107_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_107_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_107_3.geometry}
          material={materials["Green 3"]}
        />
      </group>
      <group
        position={[4.638, 26.58, -19.639]}
        rotation={[-0.076, 1.188, 0.047]}
        scale={2.583}
        onClick={() => handleProductOpen(9689001328933)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_108_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_108_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_108_3.geometry}
          material={materials["Green 4"]}
        />
      </group>
      <group
        position={[-6.128, 26.643, -19.254]}
        rotation={[-3.072, 1.152, 3.054]}
        scale={2.583}
        onClick={() => handleProductOpen(9658662519077)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_109_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_109_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_109_3.geometry}
          material={materials["Blue 1"]}
        />
      </group>
      <group
        position={[-12.094, 26.583, -16.088]}
        rotation={[-3.101, 0.785, 3.09]}
        scale={2.583}
        onClick={() => handleProductOpen(9658662519077)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_110_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_110_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_110_3.geometry}
          material={materials["Blue 2"]}
        />
      </group>
      <group
        position={[-17.024, 26.684, -10.741]}
        rotation={[-3.108, 0.558, 3.101]}
        scale={2.583}
        onClick={() => handleProductOpen(9658662519077)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_111_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_111_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_111_3.geometry}
          material={materials["Blue 3"]}
        />
      </group>
      <group
        position={[-19.613, 26.632, -4.102]}
        rotation={[-3.112, 0.31, 3.109]}
        scale={2.583}
        onClick={() => handleProductOpen(9658662519077)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_112_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_112_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_112_3.geometry}
          material={materials["Blue 4"]}
        />
      </group>
      <group
        position={[-19.363, 26.64, 6.147]}
        rotation={[-3.111, -0.418, 3.131]}
        scale={2.583}
        onClick={() => handleProductOpen(9658662682917)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_113_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_113_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_113_3.geometry}
          material={materials["Red 1"]}
        />
      </group>
      <group
        position={[-16.159, 26.564, 11.953]}
        rotation={[-3.101, -0.785, -3.137]}
        scale={2.583}
        onClick={() => handleProductOpen(9658662682917)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_114_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_114_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_114_3.geometry}
          material={materials["Red 2"]}
        />
      </group>
      <group
        position={[-10.834, 26.753, 16.981]}
        rotation={[-3.088, -1.012, -3.119]}
        scale={2.583}
        onClick={() => handleProductOpen(9658662682917)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_115_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_115_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_115_3.geometry}
          material={materials["Red 3"]}
        />
      </group>
      <group
        position={[-4.236, 26.711, 19.745]}
        rotation={[-3.049, -1.259, -3.077]}
        scale={2.583}
        onClick={() => handleProductOpen(9658662682917)}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_116_1.geometry}
          material={materials.st_metal_2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_116_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hanger_116_3.geometry}
          material={materials["Red 4"]}
        />
      </group>
    </group>
    </RigidBody>
  );
}
