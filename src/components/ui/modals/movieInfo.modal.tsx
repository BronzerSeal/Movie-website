"use client";
import CustomModal from "@/components/common/modals";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  dopInfo: {
    adult: boolean;
    budget: number;
    genres: { id: number; name: string }[];
    original_language: string;
    release_date: string;
  };
}

const MovieInfoModal = ({ isOpen, onClose, dopInfo }: IProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Movie info" size="xl">
      <ModalBody className="space-y-2 ">
        <p>
          <strong>Age Rating:</strong> {dopInfo.adult ? "18+" : "0+"}
        </p>

        <p>
          <strong>Budget:</strong>{" "}
          {dopInfo.budget
            ? `$${dopInfo.budget.toLocaleString()}`
            : "Not available"}
        </p>

        <p>
          <strong>Genres:</strong>{" "}
          {dopInfo.genres && dopInfo.genres.length > 0
            ? dopInfo.genres.map((g) => g.name).join(", ")
            : "—"}
        </p>

        <p>
          <strong>Language:</strong> {dopInfo.original_language.toUpperCase()}
        </p>

        <p>
          <strong>Release date:</strong>{" "}
          {new Date(dopInfo.release_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </ModalBody>
    </CustomModal>
  );
};

export default MovieInfoModal;
