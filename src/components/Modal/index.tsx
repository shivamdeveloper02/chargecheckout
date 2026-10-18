import React, { createContext, useContext } from 'react';
import {
  KeyboardAvoidingView,
  Modal as RNModal,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@/components/Icon';

interface ModalContextType {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within a <Modal>');
  }
  return context;
};

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
export type ModalPosition = 'top' | 'center';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  topOffset?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export interface ModalHeaderProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface ModalTitleProps {
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<TextStyle>;
  as?: string;
}

export interface ModalDescriptionProps {
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<TextStyle>;
}

export interface ModalBodyProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export interface ModalFooterProps extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const ModalRoot: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  position = 'center',
  closeOnOverlayClick = true,
  className = '',
  style,
}) => {
  const insets = useSafeAreaInsets();
  const isTop = position === 'top';

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <ModalContext.Provider value={{ onClose }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <View
            style={{
              paddingTop: isTop ? insets.top + 20 : insets.top,
              paddingBottom: insets.bottom + 16,
            }}
            className={`flex-1 justify-center items-center px-4 ${
              isTop ? 'justify-start' : 'justify-center'
            }`}
          >
            {/* Backdrop Overlay */}
            <Pressable
              onPress={closeOnOverlayClick ? onClose : undefined}
              className="absolute inset-0 bg-black/45"
            />

            {/* Modal Card */}
            <View
              style={style}
              className={`w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden ${className}`}
            >
              {children}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ModalContext.Provider>
    </RNModal>
  );
};

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className = '',
  showCloseButton = true,
  style,
  ...props
}) => {
  const { onClose } = useModal();

  return (
    <View
      style={style}
      className={`px-5 py-4 border-b border-neutral-100 flex-row items-center justify-between gap-3 bg-white ${className}`}
      {...props}
    >
      <View className="flex-1">{children}</View>
      {showCloseButton && (
        <Pressable
          onPress={onClose}
          hitSlop={8}
          className="p-1 rounded-xl active:bg-neutral-100"
          accessibilityLabel="Close modal"
        >
          <Icon name="X" size={18} color="#94A3B8" />
        </Pressable>
      )}
    </View>
  );
};

const ModalTitle: React.FC<ModalTitleProps> = ({ children, className = '', style }) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <Text
        style={style}
        className={`text-base font-bold tracking-tight text-neutral-900 leading-snug ${className}`}
      >
        {children}
      </Text>
    );
  }
  return <>{children}</>;
};

const ModalDescription: React.FC<ModalDescriptionProps> = ({ children, className = '', style }) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return (
      <Text
        style={style}
        className={`text-xs text-neutral-500 leading-relaxed mt-0.5 ${className}`}
      >
        {children}
      </Text>
    );
  }
  return <>{children}</>;
};

const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <ScrollView
      style={style}
      className={`px-5 py-4 max-h-[70vh] ${className}`}
      bounces={false}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <View
      style={style}
      className={`px-5 py-3.5 border-t border-neutral-100 bg-neutral-50/70 flex-row items-center justify-end gap-3 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

const ModalCloseButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { onClose } = useModal();
  return (
    <Pressable
      onPress={onClose}
      hitSlop={8}
      className={`p-1.5 rounded-xl active:bg-neutral-100 ${className}`}
      accessibilityLabel="Close"
    >
      <Icon name="X" size={18} color="#94A3B8" />
    </Pressable>
  );
};

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Content: ModalBody,
  Footer: ModalFooter,
  CloseButton: ModalCloseButton,
});

export default Modal;
