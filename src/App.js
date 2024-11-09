import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormLabel,
  List,
  ListItem,
  Divider,
  Text,
  Heading,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";

const ShoppingApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  
  const baseUrl = "https://...mockapi.io/...";

  const fetchData = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveItem = async () => {
    const newItem = {
      object_name: inputName,
      price: inputPrice,
      quantity: inputQuantity,
    };

    if (editItemId) {
      await fetch(`${baseUrl}/${editItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    } else {
      await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    }

    resetForm();
    fetchData();
  };

  const handleEditItem = (item) => {
    setInputName(item.object_name);
    setInputPrice(item.price);
    setInputQuantity(item.quantity);
    setEditItemId(item.id);
    onOpen();
  };

  const handleDeleteItem = async () => {
    if (deleteItemId) {
      await fetch(`${baseUrl}/${deleteItemId}`, {
        method: "DELETE",
      });
      fetchData();
      onDeleteModalClose();
    }
  };

  const isFormValid = () => {
    return inputName && inputPrice && inputQuantity;
  };

  const resetForm = () => {
    setInputName("");
    setInputPrice("");
    setInputQuantity("");
    setEditItemId(null);
    onClose();
  };

  return (
    <ChakraProvider>
      <Box 
        p={5} 
        bg="gray.100" 
        borderRadius="md" 
        boxShadow="md" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100px"
        mb={3}
      >
        <Heading as="h1" size="xl" color="teal.600">
          Your Store
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Admin Page
        </Text>
      </Box>

      <Box className="app" p={5}>
        <Box mb={4} display="flex" alignItems="center">
          <Input
            placeholder="Input product's name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            mr={2}
          />
          <Button paddingX={7} onClick={onOpen}>Add product</Button>
        </Box>

        <Modal isOpen={isOpen} onClose={resetForm}>
          <ModalOverlay />
          <ModalContent width={"360px"}>
            <ModalHeader>{editItemId ? "Edit product" : "Add new product"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Product's name:</FormLabel>
              <Input
                type="text"
                placeholder="Input product's name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                mb={2}
                maxLength={56}
              />
              <FormLabel>Price:</FormLabel>
              <Input
                type="number"
                placeholder="Input product's price"
                value={inputPrice}
                onChange={(e) => {
                  if (e.target.value.length <= 12) setInputPrice(e.target.value);
                }}
                mb={2}
                onWheel={(e) => e.target.blur()}
                maxLength={12}
              />
              <FormLabel>Quantity:</FormLabel>
              <Input
                type="number"
                placeholder="Input product's quantity"
                value={inputQuantity}
                onChange={(e) => {
                  if (e.target.value.length <= 12) setInputQuantity(e.target.value);
                }}
                mb={2}
                onWheel={(e) => e.target.blur()}
                maxLength={12}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={handleSaveItem}
                isDisabled={!isFormValid()}
              >
                {editItemId ? "Update product" : "Add product"}
              </Button>
              <Button onClick={resetForm} ml={3}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <List className="item-list">
          {todos.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" flexDirection="column">
                  <strong>{item.object_name}</strong>
                  <div style={{ color: "#666", fontSize: "0.75em" }}>
                    <strong>Price:</strong> {item.price} - <strong>Quantity:</strong> {item.quantity}
                  </div>
                </Box>
                <Box>
                  <Button onClick={() => handleEditItem(item)} mr={2}>
                    <FaEdit />
                  </Button>
                  <Button colorScheme="red" onClick={() => { setDeleteItemId(item.id); onDeleteModalOpen(); }}>
                    <FaTrash />
                  </Button>
                </Box>
              </ListItem>
              {index < todos.length - 1 && <Divider my={2} />}
            </React.Fragment>
          ))}
        </List>

        <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this product? This action cannot be undone.
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={onDeleteModalClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDeleteItem} ml={2}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default ShoppingApp;
